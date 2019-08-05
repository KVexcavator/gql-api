  //https: //github.com/login/oauth/authorize?client_id=ffcbba1b411fbaa92ac3&scope=user
  // http://localhost:4000/?code=6ff4be40e958edd2fc15

  mutation {
    githubAuth(code: "f999fb156d2d684d353a") {
      token
      user {
        githubLogin
        name
        avatar
      }
    }
  }
  var _id = 0;
  var users = [{
      githubLogin: "IvanDurov",
      name: "Izya Groisman"
    },
    {
      githubLogin: "MrTwister",
      name: "Abram Abramov"
    },
    {
      githubLogin: "MamkeyMan",
      name: "Alex Ogurcov"
    }
  ];
  var photos = [{
      id: "1",
      name: "First",
      description: "Lorem upsum something",
      category: "ACTION",
      githubUser: "IvanDurov",
      created: "10-19-1971"
    },
    {
      id: "2",
      name: "Second",
      category: "SELFIE",
      githubUser: "MamkeyMan",
      created: "5-9-2001"
    },
    {
      id: "3",
      name: "The end",
      description: "I and my treasures",
      category: "LANDSCAPE",
      githubUser: "MrTwister",
      created: "2-05-2019"
    }
  ];
  var tags = [{
      photoID: "1",
      userID: "MrTwister"
    },
    {
      photoID: "2",
      userID: "MamkeyMan"
    },
    {
      photoID: "2",
      userID: "IvanDurov"
    },
    {
      photoID: "2",
      userID: "MrTwister"
    }
  ];