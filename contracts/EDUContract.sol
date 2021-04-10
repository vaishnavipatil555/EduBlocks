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

    uint256 public CollegeRequestIndex;
    uint256 public OrganizationRequestIndex;
    uint256 public DocumentIndex;

    address public owner;

    string public version = "0.0.1";

    event eCollegeRequestAdd(uint256 indexed index, address sender);

    event eCollegeRequestUpdate(uint256 indexed index, address sender);
    
    event eOrganizationRequestAdd(uint256 indexed index, address sender);

    event eOrganizationRequestUpdate(uint256 indexed index, address sender);
/**
    modifier isOwner() {
        if (msg.sender == owner) _;
    }
    modifier isAdministrator(address _admin) {
        if (administrator[_admin] == true) _;
    }
    modifier isCollege(address _college) {
        if (colleges[_college] == true) _;
    }
    modifier isOrganization(address _organization) {
        if (organizations[_organization] == true) _;
    }
    modifier isCollegeAdministartor(address _admin) {
        if (collegeAdministrator[_admin] == true) _;
    }
    
    modifier isOrganizationAdministrator(address _admin) {
        if (organizationAdministartor[_admin] == true) _;
    }
*/

}