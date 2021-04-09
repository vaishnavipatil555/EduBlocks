pragma solidity >=0.4.0 <0.7.0;


contract EDUContract {
    enum SexType {MALE, FEMALE, OTHER}
    enum MaritalType {single, married, remarried, separated, divorced, widowed}
    enum RequestStat {CREATED, APPROVED, REJECTED, CLOSE}
    enum StudentStat {APPLIED, PURSUING, COMPLETED}
    enum DocSender {ORG, CLG}
    
// Student, College, Organization, College Admin, Organization Admin, CollegeRequest, OrganizationRequest, Document
    struct Student {
        address student;
        string fullname;
        string dob;
        SexType sex;
        MaritalType marital;
        string email;
        uint256[] document;
    }

    struct CollegeRequest {
        uint256 index;
        address student;
        uint256 datetime;
        RequestStat stat;
        string remark;
        address college;
        string docpath;
    }

    struct OrganizationRequest {
        uint256 index;
        address student;
        uint256 datetime;
        RequestStat stat;
        string remark;
        address organization;
        string docpath;
    }

    struct College {
        address Id;
        string collegename;
        string clgaddress;
        string email;
    }

    struct Organization {
        address Id;
        string orgname;
        string orgaddress;
        string email;
    }

    struct Document {
        uint256 index;
        address institute;
        address student;
        DocSender sender;
        string docname;
        string docpath;
        string docdesc;
        bool isActive;
    }

    struct CollegeAdmin {
        address Id;
        string collegeadminname;
        string clgadminaddress;
        string email;
    }

    struct OrganizationAdmin {
        address Id;
        string orgadminname;
        string orgadminaddress;
        string email;
    }

    mapping(address => Student) public students;
    mapping(address => College) public colleges;
    mapping(address => Organization) public organizations;
    mapping(address => CollegeAdmin) public collegeAdministrator;
    mapping(address => OrganizationAdmin) public organizationAdministartor;
    mapping(uint256 => CollegeRequest) public collegeRequests;
    mapping(uint256 => OrganizationRequest) public organizationRequests;
    mapping(address => bool) public administrator;
    mapping(address => bool) public isCollege;
    mapping(address => bool) public isStudent;
    mapping(address => bool) public isOrganization;
    mapping(address => bool) public isCollegeAdministartor;
    mapping(address => bool) public isOrganizationAdministrator;
    mapping(uint256 => Document) public documents;


    address public owner;

    string public version = "0.0.1";

    constructor() public {
        owner = msg.sender;
        administrator[msg.sender] = true;
        isOrganizationAdministrator[msg.sender] = true;
        isCollegeAdministartor[msg.sender] = true;
    }
   

    function SetCollegeAdministrator( 
        address _collegeadmin,
        string memory _collegeadminname,
        string memory _clgadminaddress,
        string memory _email
    ) public {
        require(msg.sender == owner);
        require(!administrator[_collegeadmin]);
        administrator[_collegeadmin] = false;

        isCollegeAdministartor[_collegeadmin] = true;
        collegeAdministrator[_collegeadmin] = CollegeAdmin(
            _collegeadmin,
            _collegeadminname,
            _clgadminaddress,
            _email
        );
    }

    function SetOrganizationAdministrator( 
        address _orgadmin,
        string memory _orgadminname,
        string memory _orgadminaddress,
        string memory _email
    ) public {
        require(msg.sender == owner);
        require(!administrator[_orgadmin]);
        administrator[_orgadmin] = false;

        isOrganizationAdministrator[_orgadmin] = true;
        organizationAdministartor[_orgadmin] = OrganizationAdmin(
            _orgadmin,
            _orgadminname,
            _orgadminaddress,
            _email
        );
    }    

    function SetCollege( 
        address _college,
        string memory _collegename,
        string memory _clgaddress,
        string memory _email
    ) public {
        require(!isCollegeAdministartor[_college]);
        isCollegeAdministartor[_college] = false;

        isCollege[_college] = true;
        colleges[_college] = College(
            _college,
            _collegename,
            _clgaddress,
            _email
        );
    }

    function SetOrganization( 
        address _organization,
        string memory _orgname,
        string memory _orgaddress,
        string memory _email
    ) public {        
        require(!isOrganizationAdministrator[_organization]);
        isOrganizationAdministrator[_organization] = false;

        isOrganization[_organization] = true;
        organizations[_organization] = Organization(
            _organization,
            _orgname,
            _orgaddress,
            _email
        );
    }

    function kill() public {
        require(msg.sender == owner);
        selfdestruct(msg.sender);
    }

    function SignupStudent(
        string memory _fullname,
        string memory _dob,
        SexType _sex,
        MaritalType _marital,
        string memory _email,
        uint256[] memory _document
    ) public {
        require(msg.sender != students[msg.sender].student);

        students[msg.sender] = Student(
            msg.sender,
            _fullname,
            _dob,
            _sex,
            _marital,
            _email,
            _document
        );
    }

    function StudentUpdate(
        string memory _fullname,
        string memory _dob,
        SexType _sex,
        MaritalType _marital,
        string memory _email
    ) public {
        require(msg.sender == students[msg.sender].student);

        students[msg.sender].fullname = _fullname;
        students[msg.sender].dob = _dob;
        students[msg.sender].sex = _sex;
        students[msg.sender].marital = _marital;
        students[msg.sender].email = _email;
    }
    

}
