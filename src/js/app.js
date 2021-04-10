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
              // Request account access if needed
              ethereum.enable();
              // Acccounts now exposed
            //  web3.eth.sendTransaction({/* ... */});
          } catch (error) {
              // User denied account access...
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
  
      // Load account data
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
            // Load Admin Page;
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
                    '<input id="adminAccountHash" type="text" class="form-control">';
                  str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Admin Name:</label>';
                  str += '<input id="fullname" type="text" class="form-control">';
                  str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Address:</label>';
                  str +=
                    '<input id="address" type="text" class="form-control">';
                  str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Admin Type:</label>';
                  str += '<select id="adminType" class="form-control" style="font-size:12pt;">';
                  str += '<option value="0" style="font-size:12pt;">College Admin</option>';
                  str += '<option value="1" style="font-size:12pt;">Organization Admin</option>';
                  str += "</select>";
                  str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">email:</label>';
                  str += '<input id="email" type="text" class="form-control">';
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
                            '<input id="adminAccountHash" type="text" class="form-control">';
                        str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">College Name:</label>';
                        str += '<input id="name" type="text" class="form-control">';
                        str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Address:</label>';
                        str +=
                            '<input id="address" type="text" class="form-control">';
                        str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">email:</label>';
                        str += '<input id="email" type="text" class="form-control">';
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
                                    '<input id="adminAccountHash" type="text" class="form-control">';
                                str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Organization Name:</label>';
                                str += '<input id="name" type="text" class="form-control">';
                                str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">Address:</label>';
                                str +=
                                    '<input id="address" type="text" class="form-control">';
                                str += '<label class="bmd-label-floating" style="font-size:14pt; margin-top:10pt">email:</label>';
                                str += '<input id="email" type="text" class="form-control">';
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
  
  
