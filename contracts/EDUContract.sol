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



}