const express = require("express");
const Profile = require("./../../models/Profile");
const User = require("./../../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("./../../middleware/auth");
const request = require("request");
const config = require("config");

const router = new express.Router();
//@route    GET /api/profile/me
//@desc     see own profile
//@access   private
/*
FUNCTIONALITY: 
*/
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id
    }).populate("User", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .send({ error: [{ msg: "there is no profile for this user" }] });
    }

    res.status(200).send(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

//@route    Post/api/profile/me
//@desc     create / update user profile
//@access   private
/*
_____
FUNCTIONALITY: 
1. use express-validator to check that status and skills are set
2. create profileFields variable and pre-set it with the user id that comes from the auth middleware 
3. Populate profileFields with property-vallue pairs from req.body
4. req.body.skills comes as a string of skills, seperated by a comma. that string needs to be converted into an array and spaces must be deleted
5. social links must be stored in the social object of profileFields and must thus be handled differently compared to the other fields 
6. Check if a profile for this user already exists ( the link between profile and user is made by Profile.user and User._id)
7. If a profile already exists, update it
8. If no profile exists, create one.
*/
router.post(
  "/me",
  [
    auth,
    //1:
    check("status", "status is required")
      .not()
      .isEmpty(),
    check("skills", "skills is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //1:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    //2:
    const profileFields = {
      user: req.user._id,
      social: {}
    };
    //3:
    const bodyKeys = Object.keys(req.body);
    bodyKeys.forEach(key => {
      //4:
      if (key === "skills") {
        profileFields.skills = req.body.skills
          .split(",")
          .map(skill => skill.trim());
      }
      //5:
      else if (
        key === "facebook" ||
        key === "youtube" ||
        key === "instagram" ||
        key === "linkedin" ||
        key === "twitter"
      ) {
        profileFields.social[key] = req.body[key];
      } else {
        profileFields[key] = req.body[key];
      }
    });
    try {
      //6:
      let profile = await Profile.findOne({ user: req.user._id });
      //7:
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).send(profile);
      }
      //8:
      newProfile = new Profile(profileFields);
      await newProfile.save();
      res.status(201).send(newProfile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("server error");
    }
  }
);

//@route    GET /api/profile/all
//@desc     fetch all profiles
//@access   public
/*
_____
FUNCTIONALITY: 
1. Find all Profiles
2. For each profile, add the user.name and user.avatar to profile.user
2. (ctd.) This is achieved firstly by setting "ref" in the Profile Model.user to "User". For this to work there must be a corresponging ObjectId in the User Model
2. (ctd.) That way, when calling populate(), mongoose alredy knows in which collection it has to search
2. (ctd.) In populate, the first param defines that profile.user should be populated
2. (ctd.) The second argument specifies which properties from User should be included
*/
router.get("/all", async (req, res) => {
  try {
    //1+2:
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).send(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("server error");
  }
});

//@route    GET /api/profile/:user_id
//@desc     fetch one profile
//@access   public
/*
_____
FUNCTIONALITY: 
1. Find one profile by the param in the url
2. Add the user.name and user.avatar to profile.user
2. (ctd.) This is achieved firstly by setting "ref" in the Profile Model.user to "User". For this to work there must be a corresponging ObjectId in the User Model
2. (ctd.) That way, when calling populate(), mongoose alredy knows in which collection it has to search
2. (ctd.) In populate, the first param defines that profile.user should be populated
2. (ctd.) The second argument specifies which properties from User should be included
3. If no user found, send error
4. If the ObjectId is invalid, e.g., too short, the try block wont execute and thus execute the catch block. However, there is no "real" server error
4. (ctd.) Thus, if the error is due to an invalid param, display a 400 error.
*/
router.get("/:user_id", async (req, res) => {
  try {
    //1+2:
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    //3:
    if (!profile) {
      return res.status(400).send("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    console.error(e.message);
    //4:
    if (e.kind === "ObjectId") {
      return res.status(400).send("Profile not found");
    }
    res.status(500).send("server error");
  }
});

//@route    DELETE /api/profile
//@desc     Delete the own accounz
//@access   private
router.delete("/", auth, async (req, res) => {
  try {
    //1+2:
    await Profile.findOneAndRemove({ user: req.user._id });
    await User.findOneAndRemove({ _id: req.user._id });
    res.status(200).send("user deleted");
  } catch (e) {
    console.error(e.message);
    res.status(500).send("server error");
  }
});

//@route    PUT /api/profile/experience
//@desc     update the own experience
//@access   private
/*
_____
FUNCTIONALITY: 
1. do express-validator checks
2. extract valid req.body params and store them in new variable. It is done this way in order to insure that no other properties from the request are stored in the new experience
3. Place the new experience at the top of the experience array and save it
*/

router.put(
  "/experience",
  [
    auth,
    //1:
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("company", "Company is required")
      .not()
      .isEmpty(),
    check("from", "Starting date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ errors: errors.array() });
    }
    try {
      //2:
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body;
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };
      //3:
      let profile = await Profile.findOne({ user: req.user._id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.status(200).send(profile);
      console.log("OK");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route    DELETE /api/profile/experience/:exp_id
//@desc     delete an experience
//@access   private
/*
_____
FUNCTIONALITY: 
1. do express-validator checks
2. extract valid req.body params and store them in new variable. It is done this way in order to insure that no other properties from the request are stored in the new experience
3. Place the new experience at the top of the experience array and save it
*/

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    const updatedExperience = profile.experience.filter(exp => {
      return req.params.exp_id != exp.id;
    });

    if (profile.experience === updatedExperience) {
      return res.status(200).send(profile);
    }

    profile.experience = updatedExperience;
    await profile.save();
    res.status(200).send(profile);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).send("Profile not found");
    }

    res.status(500).send("server error");
  }
});
//@route    PUT /api/profile/education
//@desc     update the own education
//@access   private
/*
_____
FUNCTIONALITY: 
1. do express-validator checks
2. extract valid req.body params and store them in new variable. It is done this way in order to insure that no other properties from the request are stored in the new experience
3. Place the new experience at the top of the experience array and save it
*/

router.put(
  "/education",
  [
    auth,
    //1:
    check("school", "School is required")
      .not()
      .isEmpty(),
    check("degree", "Degree is required")
      .not()
      .isEmpty(),
    check("fieldofstudy", "Field of study is required")
      .not()
      .isEmpty(),
    check("from", "Starting date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ errors: errors.array() });
    }
    try {
      //2:
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };
      //3:
      let profile = await Profile.findOne({ user: req.user._id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.status(200).send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route    DELETE /api/profile/education/:exp_id
//@desc     delete an education
//@access   private
/*
_____
FUNCTIONALITY: 
1. do express-validator checks
2. extract valid req.body params and store them in new variable. It is done this way in order to insure that no other properties from the request are stored in the new experience
3. Place the new experience at the top of the experience array and save it
*/

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    const updatedEducation = profile.education.filter(edu => {
      return req.params.edu_id != edu.id;
    });

    if (profile.education === updatedEducation) {
      return res.status(200).send(profile);
    }

    profile.education = updatedEducation;
    await profile.save();
    res.status(200).send(profile);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).send("Profile not found");
    }
    res.status(500).send("server error");
  }
});

//@route    GET /api/profile/github/:username
//@desc     get user repos from github
//@access   public
/*
_____
FUNCTIONALITY: 
1. do express-validator checks
2. extract valid req.body params and store them in new variable. It is done this way in order to insure that no other properties from the request are stored in the new experience
3. Place the new experience at the top of the experience array and save it
*/
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_id=${config.get("githubSecretKey")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };
    request(options, (error, response, body) => {
      if (error) {
        return console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).send("no github profile found");
      }

      res.status(200).send(JSON.parse(body));
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
