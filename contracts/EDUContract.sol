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
        string docdesc;
    }

    struct OrganizationRequest {
        uint256 index;
        address student;
        uint256 datetime;
        RequestStat stat;
        string remark;
        address organization;
        string docpath;
        string docdesc;
    }

    struct College {
        address Id;
        string collegename;
        string clgaddress;
        string email;
    }
    
    struct AllCollege {
            uint256 index;
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


    struct AllOrganization {
        uint256 index;
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

    struct AllAdmin {
        uint256 index;
        address Id;
        string Alladminname;
        string Alladminaddress;
        string email;
        uint256 adminType;
    }

    struct OrganizationAdmin {
        address Id;
        string orgadminname;
        string orgadminaddress;
        string email;
    }

    mapping(address => Student) public students;
    mapping(address => College) public colleges;

    mapping(uint256 => AllCollege) public AllColleges;
    mapping(address => Organization) public organizations;
    mapping(uint256 => AllOrganization) public AllOrganizations;

    mapping(address => CollegeAdmin) public collegeAdministrator;
    mapping(uint256 => AllAdmin) public AllAdministrator;
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
    uint256 public CollegeAdministratorIndex;
    uint256 public CollegeIndex;
    uint256 public OrganizationIndex;
    uint256 public OrganizationAdministratorIndex;
    uint256 public AdministratorIndex;

    address public owner;

    string public version = "0.0.1";

    event eCollegeRequestAdd(uint256 indexed index, address sender);

    event eCollegeRequestUpdate(uint256 indexed index, address sender);
    
    event eOrganizationRequestAdd(uint256 indexed index, address sender);

    event eOrganizationRequestUpdate(uint256 indexed index, address sender);

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
        string memory _email,
        uint256 _adminType
    ) public {
        require(msg.sender == owner);
        require(!administrator[_collegeadmin]);
        administrator[_collegeadmin] = false;
        CollegeAdministratorIndex++;
        AdministratorIndex++;
        isCollegeAdministartor[_collegeadmin] = true;
        collegeAdministrator[_collegeadmin] = CollegeAdmin(
            _collegeadmin,
            _collegeadminname,
            _clgadminaddress,
            _email
        );
        AllAdministrator[AdministratorIndex] = AllAdmin(
            AdministratorIndex,
            _collegeadmin,
            _collegeadminname,
            _clgadminaddress,
            _email,
            _adminType
        );
        
    }
  

    function SetOrganizationAdministrator( 
        address _orgadmin,
        string memory _orgadminname,
        string memory _orgadminaddress,
        string memory _email,
        uint256 _adminType
    ) public {
        require(msg.sender == owner);
        require(!administrator[_orgadmin]);
        administrator[_orgadmin] = false;
        OrganizationAdministratorIndex++;
        AdministratorIndex++;
        isOrganizationAdministrator[_orgadmin] = true;
        organizationAdministartor[_orgadmin] = OrganizationAdmin(
            _orgadmin,
            _orgadminname,
            _orgadminaddress,
            _email
        );
        AllAdministrator[AdministratorIndex] = AllAdmin(
            AdministratorIndex,
            _orgadmin,
            _orgadminname,
            _orgadminaddress,
            _email,
            _adminType
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
        CollegeIndex++;
        isCollege[_college] = true;
        colleges[_college] = College(
            _college,
            _collegename,
            _clgaddress,
            _email
        );
        AllColleges[CollegeIndex] = AllCollege(
            CollegeIndex,
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
        OrganizationIndex++;
        isOrganization[_organization] = true;
        organizations[_organization] = Organization(
            _organization,
            _orgname,
            _orgaddress,
            _email
        );

        AllOrganizations[OrganizationIndex] = AllOrganization(
            OrganizationIndex,
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
    
   

    function CollegeRequestAdd(
        RequestStat _stat,
        string memory _remark,
        address _college,
        string memory _docpath,
        string memory _docdesc
    ) public {
        require(msg.sender == students[msg.sender].student);
        require(isCollege[_college] == true);
        CollegeRequestIndex++;
        collegeRequests[CollegeRequestIndex] = CollegeRequest(
            CollegeRequestIndex,
            msg.sender,
            now,
            _stat,
            _remark,
            _college,
            _docpath,
            _docdesc
        );

        emit eCollegeRequestAdd(CollegeRequestIndex, msg.sender);
    }

    function CollegeRequestUpdate(
        uint256 _CollegeRequestIndex,
        RequestStat _stat,
        string memory _remark,
        address _college
    ) public {
        require(_CollegeRequestIndex > 0);
        require(_CollegeRequestIndex <= CollegeRequestIndex);

        collegeRequests[_CollegeRequestIndex].stat = _stat;
        collegeRequests[_CollegeRequestIndex].remark = _remark;
        emit eCollegeRequestUpdate(_CollegeRequestIndex, msg.sender);
    }

    function CollegeRequestGet() public view returns (uint256[] memory) {
        uint256[] memory results;
        uint256 count;
        for (uint256 i = 1; i <= CollegeRequestIndex; i++) {
            if (collegeRequests[i].student == msg.sender) {
                results[count] = i;
                count++;
            }
        }
        return results;
    }

    function OrganizationRequestAdd(
        RequestStat _stat,
        string memory _remark,
        address _organization,
        string memory _docpath,
        string memory _docdesc
    ) public {
        require(msg.sender == students[msg.sender].student);
        require(isOrganization[_organization] == true);
        OrganizationRequestIndex++;
        organizationRequests[OrganizationRequestIndex] = OrganizationRequest(
            OrganizationRequestIndex,
            msg.sender,
            now,
            _stat,
            _remark,
            _organization,
            _docpath,
            _docdesc
        );

        emit eOrganizationRequestAdd(OrganizationRequestIndex, msg.sender);
    }

    function OrganizationRequestUpdate(
        uint256 _OrganizationRequestIndex,
        RequestStat _stat,
        string memory _remark,
        address _organization
    ) public {
        require(_OrganizationRequestIndex > 0);
        require(_OrganizationRequestIndex <= OrganizationRequestIndex);

        organizationRequests[_OrganizationRequestIndex].stat = _stat;
        organizationRequests[_OrganizationRequestIndex].remark = _remark;
        emit eOrganizationRequestUpdate(_OrganizationRequestIndex, msg.sender);
    }

    function OrganizationRequestGet() public view returns (uint256[] memory) {
        uint256[] memory results;
        uint256 count;
        for (uint256 i = 1; i <= OrganizationRequestIndex; i++) {
            if (organizationRequests[i].student == msg.sender) {
                results[count] = i;
                count++;
            }
        }
        return results;
    }

    function DocumentAdd(
        address _student,
        DocSender _sender,
        string memory _docname,
        string memory _docpath,
        string memory _docdesc
    ) public {
        if(_sender == DocSender.CLG){
            require(msg.sender == colleges[msg.sender].Id);
        }
        else{
            require(msg.sender == organizations[msg.sender].Id);
        }       

        DocumentIndex++;
        documents[DocumentIndex] = Document(
            DocumentIndex,
            msg.sender,
            _student,
            _sender,
            _docname,
            _docpath,
            _docdesc,
            true
        );

        students[_student].document.push(DocumentIndex);
    }

    function DocumentGet(address _addr)
        public
        view
        returns (uint256[] memory)
    {
        return students[_addr].document;
    }

}

