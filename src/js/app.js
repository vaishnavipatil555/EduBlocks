App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  loading: false,
  isAdmin: false,
  isCollege: false,
  isOrganization: false,
  isCollegeAdministartor: false,
  isOrganizationAdministrator: false,
  isStudent: false,
  CONST_SEX: new Array("Male", "Female"),
  CONST_MARITAL: new Array(
    "Single",
    "Married",
    "Remarried",
    "Separated",
    "Divorced",
    "Widowed"
  ),
  CONST_REQUEST: new Array(
    "CREATED",
    "APPROVED",
    "REJECTED",
    "DONE"
  ),
  CONST_DocSender: new Array(
      "ORG",
      "CLG"
    ),

  init: function () {
    console.log("App initialized...");
    return App.initWeb3();
  },

  initWeb3: function () {
    web3 = new Web3(ethereum);
        try {
            ethereum.enable();
        } catch (error) {
        }
  
  if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initContracts: function () {
    $.getJSON("EDUContract.json", function (edu) {
      App.contracts.EDU = TruffleContract(edu);
      App.contracts.EDU.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function () {
    if (App.loading) {
      return;
    }
    App.loading = true;

    App.loaderShow(true);

    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
      }
    });

    App.LoadDefaultPage();
  },

  LoadDefaultPage: function () {
    App.contracts.EDU.deployed()
      .then(function (instance) {
        EDUInstance = instance;
        return EDUInstance.administrator(App.account);
      })
      .then((isAdmin) => {
        console.log("Is admin", isAdmin);
        App.loaderShow(false);
        if (isAdmin) {
          App.isAdmin = true;

          $("#content").load("AdminProfileView.html", function () {
            $("#sliderbarContainer").load("AdminSliderbarContainer.html");
            $("#adminCont").empty();

            EDUInstance.owner().then((owner) => {
              if (owner == App.account) {
                  
                let str = '<div class="col-md-12">';
                str += '<div class="form-group">';
                str +=
                  '<label class="bmd-label-floating" style="font-size:14pt;">Account Hash:</label>';
                str +=
                  '<input id="adminAccountHash" type="text" class="form-control" autocomplete="off">';
                str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Admin Name:</label>';
                str += '<input id="fullname" type="text" class="form-control" autocomplete="off">';
                str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Address:</label>';
                str +=
                  '<input id="address" type="text" class="form-control" autocomplete="off">';
                str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Admin Type:</label>';
                str += '<select id="adminType" class="form-control" style="font-size:12pt;">';
                str += '<option value="0" style="font-size:12pt;">College Admin</option>';
                str += '<option value="1" style="font-size:12pt;">Organization Admin</option>';
                str += "</select>";
                str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">email:</label>';
                str += '<input id="email" type="text" class="form-control" autocomplete="off">';
                str +=
                  '<button onclick="App.AdministratorAction();" class="btn btn-primary pull-right">Add Admin</button>';
                str += "</div>";
                str += "</div>";
                $("#adminCont").html(str);
              }
            });
          });
        } 
        else{
          return EDUInstance.collegeAdministrator(App.account).then((collegeAdmin) => {
              console.log("Is College Admin", collegeAdmin);
              if (collegeAdmin[0] == App.account) {
                  console.log("Is College Admin", collegeAdmin);
                  App.isCollegeAdministartor = true;
                  $("#content").load("CollegeAdminProfileView.html", function () {
                  $("#sliderbarContainer").load("CollegeAdminSliderbarContainer.html");
                  $("#collegeAdminCont").empty();
                  console.log($("#collegeAdminCont"))
                      let str = '<div class="col-md-12">';
                      str += '<div class="form-group">';
                      str +=
                          '<label class="bmd-label-floating" style="font-size:14pt;">Account Hash:</label>';
                      str +=
                          '<input id="adminAccountHash" type="text" class="form-control" autocomplete="off">';
                      str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">College Name:</label>';
                      str += '<input id="name" type="text" class="form-control" autocomplete="off">';
                      str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Address:</label>';
                      str +=
                          '<input id="address" type="text" class="form-control" autocomplete="off">';
                      str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">email:</label>';
                      str += '<input id="email" type="text" class="form-control" autocomplete="off">';
                      str +=
                          '<button onclick="App.CollegeAdministratorAction();" class="btn btn-primary pull-right">Add College</button>';
                      str += "</div>";
                      str += "</div>";
                      $("#collegeAdminCont").html(str);
                  });
              }else{
                  return EDUInstance.organizationAdministartor(App.account).then((orgAdmin) => {
                      console.log("Is Organization Admin", orgAdmin);
                      if (orgAdmin[0] == App.account) {
                          App.isOrganizationAdministrator = true;
          
                          $("#content").load("OrgAdminProfileView.html", function () {
                          $("#sliderbarContainer").load("OrgAdminSlidebarContainer.html");
                          
                          $("#orgAdminCont").empty();
                          
              
                              let str = '<div class="col-md-12">';
                              str += '<div class="form-group">';
                              str +=
                                  '<label class="bmd-label-floating" style="font-size:14pt;">Account Hash:</label>';
                              str +=
                                  '<input id="adminAccountHash" type="text" class="form-control" autocomplete="off">';
                              str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Organization Name:</label>';
                              str += '<input id="name" type="text" class="form-control" autocomplete="off">';
                              str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Address:</label>';
                              str +=
                                  '<input id="address" type="text" class="form-control" autocomplete="off">';
                              str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">email:</label>';
                              str += '<input id="email" type="text" class="form-control" autocomplete="off">';
                              str +=
                                  '<button onclick="App.OrgAdministratorAction();" class="btn btn-primary pull-right">Add Organization</button>';
                              str += "</div>";
                              str += "</div>";
                              $("#orgAdminCont").html(str);
                              
                          });
                      }
                      else{
                        return EDUInstance.colleges(App.account).then((college) => {
                            console.log("Is college", college);
                            if (college[0] == App.account) {
                              App.isCollege = true;
                
                              $("#content").load("CollegeProfileView.html", function () {
                                $("#sliderbarContainer").load("CollegeSliderbarContainer.html");
                                console.log("DONE");
                                $("#account").html(
                                  'Account Hash: <a href="#">' + App.account + "</a>"
                                );
                                $("#collegeName").html("College Name: " + college[1]);
                                $("#clgAddress").html("College Address: " + college[2]);
                                $("#email").html("Email: " + college[3]);
                              });;
                            }
                            
                            else{
                              return EDUInstance.organizations(App.account).then((organization) => {
                                  console.log("Is organization", organization);
                                  if (organization[0] == App.account) {
                                    App.isOrganization = true;
                      
                                    $("#content").load("OrganizationProfileView.html", function () {
                                      $("#sliderbarContainer").load("OrganizationSliderbarContainer.html");
                                      console.log("DONE");
                                      $("#account").html(
                                        'Account Hash: <a href="#">' + App.account + "</a>"
                                      );
                                      $("#orgName").html("Organization Name: " + organization[1]);
                                      $("#orgAddress").html("Organization Address: " + organization[2]);
                                      $("#email").html("Email: " + organization[3]);
                                    });;
                                  }
                                  
                                  else{
                                      App.LoadSignupPage();
                                  }    
                                                  
                              });
                          
                            }    
                                            
                        });
                        }  
                                      
                  });
                  }
              });
              }
          });
      },


  PopulateUserData: function () {
    App.contracts.EDU.deployed()
      .then(function (instance) {
        EDUInstance = instance;
        return EDUInstance.students(App.account);
      })
      .then((student) => {
        $("#fullname").val(student[1]);
        $("#dob").val(student[2]);
        $("#sex").val(student[3].toNumber());
        $("#marital").val(student[4].toNumber());
        $("#email").val(student[5]);

      }); 
  },

  LoadSignupPage: function () {  
    $("#content").load("ProfileEdit.html", function () {
      $("#sliderbarContainer").load("SliderbarContainer.html");

      App.PopulateUserData();

      if (App.isStudent == true) {
          console.log("Student update")
        $("#ButtonContainer").html(
          '<button onclick="App.StudentUpdate()" class="btn btn-primary pull-right">Update Profile</button>'
        );
        $("#PageTitle").html("Update Profile");
      } else {
          App.isStudent = true;
        $("#ButtonContainer").html(
          '<button onclick="App.SignupStudent()" class="btn btn-primary pull-right">Save New Profile</button>'
        );
        $("#PageTitle").html("Edit Profile");
      }
    });
  },

  StudentUpdate: function () {
    const _fullname = $("#fullname").val();
    const _dob = $("#dob").val();
    const _sex = $("#sex").find(":selected").val();
    const _marital = $("#marital").find(":selected").val();
    const _email = $("#email").val();  
    App.loaderShow(true);

    App.contracts.EDU.deployed()
      .then(function (instance) {
        EDUInstance = instance;
        return EDUInstance.StudentUpdate(
          _fullname,
          _dob,
          parseInt(_sex),
          parseInt(_marital),
          _email,
          { from: App.account }
        );
      })
      .then((recipt) => {
        console.log("Update successfully.");
        App.LoadDefaultPage();
      });
  },

  SignupStudent: function () {
    const _fullname = $("#fullname").val();
    const _dob = $("#dob").val();
    const _sex = $("#sex").find(":selected").val();
    const _marital = $("#marital").find(":selected").val();
    const _email = $("#email").val();
    const ReportDocsArray = [0];

    App.loaderShow(true);

    App.contracts.EDU.deployed()
      .then(function (instance) {
        EDUInstance = instance;
        
        return EDUInstance.SignupStudent(
          _fullname,
          _dob,
          _sex,
          _marital,
          _email,
          ReportDocsArray,
          { from: App.account }
        );
      })
      .then((recipt) => {
        console.log("Saved successfully.");
        App.LoadDefaultPage();
      })
      .catch((error) => {
        console.log(error.message);
        App.loaderShow(false);
      });
  },

  /** ADMINISTRATOR ACTIONS */

  AdministratorAction: function () {
    const accountHash = $("#adminAccountHash").val();
    const _name = $("#fullname").val();
    const _address = $("#address").val();
    const _adminType = $("#adminType").find(":selected").val();
    const _email = $("#email").val();
    App.loaderShow(true);

    App.contracts.EDU.deployed()
      .then(function (instance) {
        EDUInstance = instance;
        if(_adminType == 0){
          return EDUInstance.SetCollegeAdministrator(
              accountHash,
              _name,
              _address,
              _email,
              { from: App.account }
            );            
        }
        else{
          return EDUInstance.SetOrganizationAdministrator(
              accountHash,
              _name,
              _address,
              _email,
              { from: App.account }
            );           
        }
      })
        
      .then((result) => {
        console.log("working...");
        console.log(result);
        App.LoadDefaultPage();
      })
      .catch((error) => {
        console.log("error...");
        console.log(error);
      });
  },


  CollegeAdministratorAction: function () {
      const accountHash = $("#adminAccountHash").val();
      const _name = $("#name").val();
      const _address = $("#address").val();
      const _email = $("#email").val();
      App.loaderShow(true);    
      App.contracts.EDU.deployed()
        .then(function (instance) {
          EDUInstance = instance;
          return EDUInstance.SetCollege(
                accountHash,
                _name,
                _address,
                _email,
                { from: App.account }
          );  
        })
          
        .then((result) => {
          console.log("working...");
          console.log(result);
          App.LoadDefaultPage();
        })
        .catch((error) => {
          console.log("error...");
          console.log(error);
        });
    },

    OrgAdministratorAction: function () {
      const accountHash = $("#adminAccountHash").val();
      const _name = $("#name").val();
      const _address = $("#address").val();
      const _email = $("#email").val();
      App.loaderShow(true);    
      App.contracts.EDU.deployed()
        .then(function (instance) {
          EDUInstance = instance;
          return EDUInstance.SetOrganization(
                accountHash,
                _name,
                _address,
                _email,
                { from: App.account }
          );  
        })
          
        .then((result) => {
          console.log("working...");
          console.log(result);
          App.LoadDefaultPage();
        })
        .catch((error) => {
          console.log("error...");
          console.log(error);
        });
    },

  
  /*** REQUESTS  */
  
  
  LoadRequestPageForCollegeAdmin: function () {
    let AppCount = 0;

    $("#content").load("CollegeRequest.html", function () {
      $("#ScheduleNewCont").hide();
      $("#sliderbarContainer").load("CollegeSliderbarContainer.html");

      $("#RequestCardContainer").empty();
      App.contracts.EDU.deployed()
        .then(function (instance) {
          EDUInstance = instance;
          return EDUInstance.CollegeRequestIndex();
        })
        .then((reply) => {
          AppCount = reply.toNumber();

          let i = 1;
    
          while (i <= AppCount) {
            EDUInstance.collegeRequests(i).then((request) => {
              console.log(request[4]);
              const obj = request[4];
              let str = '<div class="row">';
              str += '<div class="col-lg-12">';
              if (App.account == request[5]) {
                  console.log(request[5]); 
                  console.log(request[3].toNumber())
                  if (request[3].toNumber() == 0) {
                      console.log(request[3].toNumber())
                    var date = new Date(request[2].toNumber());
                    str += '<table>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Index: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[0] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Student Hash Code: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[1] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Status: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + App.CONST_REQUEST[request[3].toNumber()] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Remark: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[4] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Document URL: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4><a href="' + request[6] + '">' + request[6] + '</a></h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Document Description: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[7] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += '</table>'
                    let create = 1;
                    let reject = 2;
                    str +=
                      '<button onclick="App.CollegeRequestUpdate(' +
                      request[0] +
                      ", " +
                      create +
                      ",'" +
                      request[4] +
                      "', " +
                      request[5] +
                      ')" class="btn btn-primary pull-right">Accept</button>';
                    str +=
                      '<button onclick="App.CollegeRequestUpdate(' +
                      request[0] +
                      ", " +
                      reject +
                      ",'" +
                      request[4] +
                      "', " +
                      request[5] +
                      ');" class="btn btn-primary pull-right">Cancel</button>';
                      str +=
                        '<button onclick="App.ReturnCollegeDocuments(' +
                        request[1] +
                        ');" class="btn btn-primary pull-right">View Documents</button>';
                  }
              }
              str += "</div>";
                      str += "</div>";
                      str += "<hr />";

                      $("#RequestCardContainer").append(str);
            });

            i++;
          
          }
          App.loaderShow(false);
        });
    });
  },
  
  LoadAllColleges: function () {
      console.log("isCollegeAdmin", App.isCollegeAdministartor);
      if (!App.isCollege) {
        return;
      }
  
      $("#content").load("AllAdminsView.html", function () {
        $("#sliderbarContainer").load("CollegeAdminSliderbarContainer.html");
      });
    },

    LoadAllOrganizations: function () {
      console.log("isOrgAdmin", App.isOrganizationAdministrator);
      if (!App.isOrganization) {
        return;
      }
  
      $("#content").load("AllAdminsView.html", function () {
        $("#sliderbarContainer").load("OrgAdminSliderbarContainer.html");
      });
    },

  LoadCollegeRequestPage: function () {
    console.log("is Student", App.isStudent);
    if (!App.isStudent) {
      return;
    }

    let AppCount = 0;

    $("#content").load("CollegeRequest.html", function () {
      $("#sliderbarContainer").load("CollegeSliderbarContainer.html");

      $("#RequestCardContainer").empty();

      App.contracts.EDU.deployed()
        .then(function (instance) {
          EDUInstance = instance;
          return EDUInstance.DocumentGet(App.account);
        })
        .then((reply) => {
          let DocCount = reply.length;
          let j = 1;
          let loaded_j = 1;
          let str = '<label class="bmd-label-floating">Select Document:</label>';
          str += '<select id="reportList" class="form-control">';
          while (j < DocCount) {
            EDUInstance.documents(reply[j].toNumber()).then((result) => {
              str +=
                '<option value="' + result[4] + '">' + result[0] + "</option>";
              if (DocCount == loaded_j + 1) {
                str += "</select>";
                $("#reportList").empty();
                $("#reportList").append(str);
              } else {
                loaded_j++;
              }
            });
            j++;
          }
          console.log("Complete Loading Docs List");
          return EDUInstance.CollegeRequestIndex();
        })
        .then((reply) => {
          AppCount = reply.toNumber();


          let i = 1;

          while (i <= AppCount) {
            console.log("Appcount", AppCount);
            EDUInstance.collegeRequests(i).then((request) => {
              console.log(request[4]);
              if (request[1] == App.account) {
                console.log("student matched...");
                const obj = JSON.parse(request[4]);
                var date = new Date(request[2].toNumber());
                let str = '<div class="row">';

                /** LOAD REPORT IMAGE */
                if (obj["rep"]) {
                  EDUInstance.documents(obj["rep"])
                    .then((report) => {
                      console.log(report);
                      str += '<div class="col-md-3">';
                      str +=
                        '<a href="' +
                        report[1] +
                        '" target="blank"><img src="' +
                        report[1] +
                        '" width="100" height="100"></a>';
                      str += "</div>";
                      str += '<div class="col-md-9">';

                      str += "Date & Time: " + date.toLocaleString();
                      str += "<br />Message: " + obj["msg"];
                      str +=
                        "<br />Status: " +
                        App.CONST_REQUEST[request[3].toNumber()];

                      if (request[3].toNumber() == 4) {
                        str += "<br/>Remark: " + obj["pre"];
                        str += "<br/>";
                         }
                      
                      str += "</div>";
                      str += "</div>";
                      str += "<hr />";

                      $("#RequestCardContainer").append(str);
                    })
                    .catch((error) => {
                      console.log("Error loading report. ", error);
                    });
                }
              }
            });

            i++;
          }
          App.loaderShow(false);
        });
    });
  },

    LoadStudentRequestPage: function () {
      console.log("is Student", App.isStudent);
      if (!App.isStudent) {
        return;
      }
      console.log("Hello");
  
      let AppCount = 0;
  
      $("#content").load("StudentRequest.html", function () {
        $("#sliderbarContainer").load("SliderbarContainer.html");
  
        $("#ClgRequestCardContainer").empty();
        
         App.contracts.EDU.deployed()
          .then(function (instance) {
              EDUInstance = instance;
              return EDUInstance.CollegeRequestIndex();
          })
          
          .then((reply) => {
              console.log("Hello", reply);
              AppCount = reply['c'][0];
  
            console.log("==> " + AppCount);
  
            let i = AppCount;
  
            while (i >= 1) {
              console.log("Appcount", AppCount);
              EDUInstance.collegeRequests(i).then((request) => {
                console.log(request[4]);
                if (request[1] == App.account) {
                  console.log("student matched...");
                  const obj = request[4];
                  var date = new Date(request[2].toNumber());
                  let str = '<div class="row">';
  
                        str += '<div class="col-md-6">';
                        str += '<table>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Clg Request Index: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[0] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Clg Hash Code: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[5] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Status: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + App.CONST_REQUEST[request[3].toNumber()] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Remark: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[4] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Document URL: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4><a href="' + request[6] + '">' + request[6] + '</a></h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += ' <tr>'
                        str += ' <td>'
                        str += '<h4>Document Description: </h4>'
                        str += ' </td>'
                        str += ' <td>'
                        str += '<h4>' + request[7] + '</h4>'
                        str += ' </td>'
                        str += ' </tr>'
                        str += '</table>'
                        if(request[3].toNumber() == 1){
                          str += '<h4 style="color: green; font-weight: bold"> Congratulations! Your request has been approved!</h4>'
                        }
                        if(request[3].toNumber() == 2){
                          str += '<h4 style="color: red; font-weight: bold"> Sorry! Your request is rejected!</h4>'
                        }
                                                    
                        str += "</div>";
                        str += "</div>";
                        str += "<hr />";
  
                        $("#ClgRequestCardContainer").append(str);
                  
                }
              });
  
              i--;
            }
            App.loaderShow(false);
          });
      });
    },


  RequestAdd: function () {
      var college = $("#college").val();
      var msg = $("#message").val();
      var doc = $("#docURL").val();
      var docdesc = $("#docdesc").val();
      console.log($("#requestTo").val())
      if($("#requestTo").val() == 0){
          App.CollegeRequestAdd(college, msg, doc, docdesc);
      }
      else{
          console.log("OrgRequest")
          App.OrgRequestAdd(college, msg, doc, docdesc);
      }
  },

  CollegeRequestAdd: function (college, msg, doc, docdesc) {
    
    const RequestStat = 0;
      
    App.loaderShow(true);

    App.contracts.EDU.deployed()
      .then(function (instance) {
        EDUInstance = instance;
        return EDUInstance.CollegeRequestAdd(
          RequestStat,
          msg,
          college,
          doc,
          docdesc,
          { from: App.account }
        );
      })
      .then((reply) => {
        console.log(reply);
        console.log("Request Saved Successfully.");
        App.LoadCollegeRequestPage();
      });
  },

  CollegeRequestUpdate: function (ind, stat, remark, college) {
    console.log("in request update...");
    App.loaderShow(true);

    App.contracts.EDU.deployed()
      .then(function (instance) {
        EDUInstance = instance;
        console.log("instance");
        return EDUInstance.collegeRequests(ind);
      })
      .then((reply) => {
          console.log(reply[0], stat, remark);
        return EDUInstance.CollegeRequestUpdate(
          ind,
          stat,
          remark,
          college,
          { from: App.account }
        );
      })
      .then((results) => {
        console.log(results);
        console.log("Request updated Successfully.");

        App.LoadRequestPageForCollegeAdmin();
      })
      .catch((error) => {
        console.log(error.message);
        App.loaderShow(false);
      });
  },
  
  /** MISLENOUS FUNCTINOS */

  loaderShow: function (bool) {
    var loader = $("#loader");
    var content = $("#content");
    if (bool) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});