// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract dAppify{

    uint totalusers;
    uint totalRegisteredDapps;
    uint subscriptionPay = 0.01 ether;
    address subscrptionAddress = address(this);
    address public owner;
    uint totalDAOmem;
    uint totalProposals;


    constructor() {
        // Set the contract deployer as the owner
        owner = msg.sender;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    //struct of the user
    struct User{
        uint userId;
        string firstName;
        string secondName;
        string userName;
        uint Downloads;
        address myAddress;
    }

    //struct of a member of the DAO
    struct DAOMember{
        uint userId;
        string username;
        address memberAddress;
    }

    //struct for proposed dApp
    struct Proposal {
        uint proposalId;
        string dAppName;
        string description;
        uint yesVotes;
        uint noVotes;
        uint endtime;
        mapping(address => bool) hasVoted;
        address proposer;
        bool isApproved;
    }


    //struct of registered dApp
    struct dApp{
        uint dAppId;
        string dAppName;
        string description;
        address dAppreg;
    }

    //mapping of dApps
    mapping(uint => dApp) dAppsMap;

    //mapping of username to User struct
    mapping (string => User) private ourUsers;

    //mapping of index of user struct
    mapping (uint => User) private users;

    //mappimg address and user
    mapping(address => User) private userAddress;

    //mapping index to DAO member
    mapping (string => DAOMember) public DaoMem;

    //mapping proposal ID to proposal
    mapping(uint => Proposal) public IdProposal;

    //mapping of index of user struct
    mapping (uint => DAOMember) private DAOmembers;

    //event for making a proposal
    event ProposalCreated(uint proposalId, string dAppName,string description,uint yesVotes,uint noVotes,uint totalvotes,
        uint endtime,address proposer);

    //event to show that one has voted
    event Voted(address DAOmember, uint ProposalId);

    //event to show a proposal has been approved
    event ProposalApproved(uint proposalId);

    //event for a member joining the DAO
    event succJoined(uint userId, string userName, address memberAddress);

    //event for registered user
    event userRegistered(uint userId, string firstName ,string secondName, string userName ,uint Downloads ,address myAddress);

    //event for registered Dapp
    event dAppRegistered(uint dAppId, string dAppName, string description,address dAppreg);

    //function to register user
    function signUp(string memory _firstName, string memory _secondName, string memory _userName) public {
        require(!Exist(_userName), "username already taken");
        address _myAddress = msg.sender;
        uint _userId = totalusers++;
        ourUsers[_userName]= User(_userId,_firstName , _secondName, _userName,0, _myAddress);
        users[_userId] = User(_userId,_firstName , _secondName, _userName,0, _myAddress);
        userAddress[_myAddress] = User(_userId,_firstName , _secondName, _userName,0, _myAddress);
        emit userRegistered(_userId,_firstName , _secondName, _userName, 0,_myAddress);
        }

    //function to join the DAO
    function joinDAO() public payable {
        require(registered(msg.sender), "First signup to have an account");
        string memory _userName = userAddress[msg.sender].userName;
        uint _userId = userAddress[msg.sender].userId;
        require(msg.value > 0, "Enter an amount");
        (bool sent, ) = subscrptionAddress.call{value: msg.value}("");
        if (sent){
            DaoMem[_userName] = DAOMember(_userId, _userName , msg.sender);
            emit succJoined(_userId, _userName, msg.sender);
        } else {
            return;
        }
        
    }

    //function to get user
    function getUser(string memory _userName) public view returns(User memory){
        return ourUsers[_userName];
    }

    //function to get total number of users
    function totalUsers() public view returns (uint) {
        return totalusers;
    }

    //function to get all users
    function getAllUsers() public view returns (User[] memory){
        User[] memory userList = new User[](totalusers);
        for (uint i = 0; i < totalusers; i++) {
            userList[i] = users[i];
        }
        return userList;
    }

    //function to register dApp
    function proposeDapp(string memory _dAppName, string memory _description) public payable {
        address _proposer= msg.sender;
        require(msg.value == subscriptionPay, "Enter the correct price");
        (bool sent, ) = subscrptionAddress.call{value: msg.value}("");
        if (sent){
            uint _proposalId = totalProposals++;
            uint _endtime = block.timestamp + 24 hours;
            Proposal storage newProposal = IdProposal[_proposalId ];
            newProposal.proposalId = _proposalId;
            newProposal.dAppName = _dAppName;
            newProposal.description = _description;
            newProposal.endtime = _endtime;
            newProposal.proposer = _proposer;
            emit ProposalCreated(_proposalId,_dAppName, _description,0,0,0,_endtime, _proposer);
        } else {
            return;
        }    
    }

    //function to vote
    function vote(uint _proposalId, bool _yes, bool _no) public onlyMember{
        Proposal storage proposal = IdProposal[_proposalId];
        require(!proposal.hasVoted[msg.sender], "Already voted on this proposal");
        if (_yes) {
            proposal.yesVotes++;
        } else if (_no){
            proposal.noVotes++;
        }
        proposal.hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _proposalId);

        // Check if proposal is approved
        if (proposal.yesVotes > totalDAOmem / 2) {
            proposal.isApproved = true;
            emit ProposalApproved(_proposalId);
        }
    }


    //function to get registered dApp
    function getdApp(uint _dAppId) public view returns (dApp memory) {
        return dAppsMap[_dAppId];
    }

    //function to get all dApps
    function getAllDapps() public view returns (dApp[] memory){
        dApp[] memory dappList = new dApp[](totalRegisteredDapps);
        for (uint i = 0; i < totalRegisteredDapps; i++) {
            dappList[i] = dAppsMap[i];
        }
    return dappList;
    }

    //function to check if username exist
    function Exist(string memory _userName) private view returns (bool) {
        for(uint i = 0; i < totalusers; i++) {
        if(keccak256(bytes(users[i].userName)) == keccak256(bytes(_userName))){
            return true;
        }
    }
    return false;}

    //function to update downloads
    function download() public {
        require(registered(msg.sender), "Please signUp");
        userAddress[msg.sender].Downloads++;     
    }

    //function to check if address is registered
    function registered(address _myAdd) public view returns (bool) {
        for (uint i=0; i < totalusers; i++ ){
            if(users[i].myAddress == _myAdd){
                return true;
            }
        }
    return false;}

    //function to login
    function login( string memory _userName) public view returns (bool) {
        require(Exist(_userName),"username not found");
        require(registered(msg.sender),"username not found");
        require(ourUsers[_userName].myAddress == msg.sender , "Please use the address you used to create");
        return true;
    }

    //function to withdraw from the contract
    function withdraw() public payable onlyOwner {
        uint amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");
        (bool sent, ) = owner.call{value: amount}("");
        require(sent , "Unable to withdraw");
    }

    //modifier for onlyOwner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    //modifier for onlyMember
    modifier onlyMember(){
        require(member(msg.sender), "Only DAO members can perform this");
        _;
    }

    //function to check if address is in the DAO
    function member(address _myAdd) public view returns (bool) {
        for (uint i=0; i < totalDAOmem; i++ ){
            if(DAOmembers[i].memberAddress == _myAdd){
                return true;
            }
        }
    return false;}

}