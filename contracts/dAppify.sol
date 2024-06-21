// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract dAppify{

    uint public totalusers;
    uint public totalRegisteredDapps;
    uint constant subscriptionPay = 260000000000000;
    address public owner;
    uint  public totalDAOmem;
    uint public totalProposals;
    uint public totalDownloads;


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

    //struct of download
    struct Downloads{
        uint dAppId;
        address myAddress;
    }

    //struct for proposed dApp
    struct Proposal {
        uint proposalId;
        string dAppName;
        string ipfsHash;
        string description;
        string category;
        string chain;
        string url;
        string sourceCode;
        string demolink;
        string telegram;
        string discord;
        string email;
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
        string ipfsHash;
        string category;
        string chain;
        string description;
        string url;
        string sourceCode;
        string demolink;
        address dAppreg;
        string telegram;
        string discord;
        string email;
    }

    //struct params to simplify functions
    struct Params{
        string dAppName;
        string ipfsHash;
        string category;
        string chain;
        string description;
        string url;
        string sourceCode;
        string demolink;
        string telegram;
        string discord;
        string email;
    }

    //mapping of dApps
    mapping(uint => dApp) public dAppsMap;

    //mapping of username to User struct
    mapping (string => User) public ourUsers;

    //mapping of index of user struct
    mapping (uint => User) public users;

    //mappimg address and user
    mapping(address => User) public userAddress;

    //mapping index to DAO member
    mapping (string => DAOMember) public DaoMem;

    //mapping proposal ID to proposal
    mapping(uint => Proposal) public IdProposal;

    //mapping of index of user struct
    mapping (uint => DAOMember) public DAOmembers;

    //mapping of uint to Downloads Struct
    mapping (uint => Downloads) public DownloadsUint;

    dApp[] public dAppsList;
    DAOMember[] public DAOs;
    User[] public userArray;
    Downloads[] public DownloadsArray;

    //event for making a proposal
    event ProposalCreated(uint proposalId, string dAppName, string ipfsHash,
        string category,string chain,
        string description,
        string url,
        string sourceCode,
        string demolink,
        string telegram,
        string discord,
        string email,uint yesVotes,uint noVotes,uint totalvotes,
        uint endtime,address proposer);

    //event to show that one has voted
    event Voted(address DAOmember, uint ProposalId);

    //event to show a proposal has been approved
    event ProposalApproved(uint proposalId);

    //event for a member joining the DAO
    event succJoined(uint userId, string userName, address memberAddress);

    //event for registered user
    event userRegistered(uint userId, string userName ,uint Downloads ,address myAddress);

    //event for registered Dapp
    event dAppRegistered(uint dAppId, string dAppName, string ipfsHash, string category,string chain,
        string description,
        string url,
        string sourceCode,
        string demolink,
        address dAppreg,
        string telegram,
        string discord,
        string email);

    //function to register user
    function signUp(string memory _userName) public {
        require(!Exist(_userName), "username already taken");
        require(!registered(msg.sender),"the address is already registered");
        
        uint _userId = totalusers;
        User memory newUser = User({
            userId: _userId,
            userName: _userName,
            Downloads: 0,
            myAddress: msg.sender
        });

        ourUsers[_userName] = newUser;
        users[_userId] = newUser;
        userAddress[msg.sender] = newUser;
        userArray.push(newUser);
        totalusers++;

        emit userRegistered(_userId, _userName, 0, msg.sender);
        }

    //function to get username from address
    function getUser(address _myAdd) public view returns(User memory , bool){
        if (registered(_myAdd)) {
            return (userAddress[_myAdd], true);
        } else {
            return (User(0, "", 0, address(0)), false);
        }
        
    }
      

    // Function to join the DAO
    function joinDAO() public payable {
        require(registered(msg.sender), "First signup to have an account");
        require(!member(msg.sender), "Already in the DAO");
        require(msg.value > 0, "Enter an amount");
        (bool sent, ) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        string memory _userName = userAddress[msg.sender].userName;
        bytes memory checkMark = "\xE2\x9C\x94";
        uint _userId = totalDAOmem;
        string memory _username = string(abi.encodePacked(_userName, checkMark));
        DAOMember memory newDAOMember = DAOMember({
            userId: _userId,
            username: _username,
            memberAddress: msg.sender
        });
        DAOmembers[_userId] = newDAOMember;
        userAddress[msg.sender].userName = _username;
        DAOs.push(newDAOMember);
        totalDAOmem++;
        emit succJoined(_userId, _userName, msg.sender);
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
    function proposeDapp(Params memory params) public payable {
        require(msg.value == subscriptionPay, "Enter the correct price");
        (bool sent, ) = address(this).call{value: msg.value}("");
        require(sent , "ether not sent");
            
        uint _proposalId = totalProposals;
        uint _endtime = block.timestamp + 24 hours;
        Proposal storage newProposal = IdProposal[_proposalId ];
        newProposal.proposalId = _proposalId;
        newProposal.dAppName = params.dAppName;
        newProposal.ipfsHash = params.ipfsHash;
        newProposal.category = params.category;
        newProposal.chain = params.chain;
        newProposal.description = params.description;
        newProposal.url = params.url;
        newProposal.sourceCode = params.sourceCode;
        newProposal.demolink = params.demolink;
        newProposal.telegram = params.telegram;
        newProposal.discord = params.discord;
        newProposal.email = params.email;
        newProposal.endtime = _endtime;
        newProposal.proposer = msg.sender;

        totalProposals++;
        
        emit ProposalCreated(_proposalId, params.dAppName, params.ipfsHash,
        params.category,
        params.chain,
        params.description,
        params.url,
        params.sourceCode,
        params.demolink,
        params.telegram,
        params.discord,
        params.email,0,0,0,_endtime,msg.sender);
        
    }

    //function to register dApp
    function registerDapp(Params memory params) public payable {
        require(msg.value == subscriptionPay, "Enter the correct price");
        (bool sent, ) = address(this).call{value: msg.value}("");
        require(sent , "ether not sent");
            
        uint _dAppId = totalRegisteredDapps;
        dApp storage newdApp = dAppsMap[_dAppId];
        newdApp.dAppId = _dAppId;
        newdApp.dAppName = params.dAppName;
        newdApp.ipfsHash = params.ipfsHash;
        newdApp.category = params.category;
        newdApp.chain = params.chain;
        newdApp.description = params.description;
        newdApp.url = params.url;
        newdApp.sourceCode = params.sourceCode;
        newdApp.demolink = params.demolink;
        newdApp.dAppreg = msg.sender;
        newdApp.telegram = params.telegram;
        newdApp.discord = params.discord;
        newdApp.email = params.email;

        totalRegisteredDapps++;

        dAppsList.push(newdApp);
        
        emit dAppRegistered(_dAppId, params.dAppName, params.ipfsHash,
        params.category,
        params.chain,
        params.description,
        params.url,
        params.sourceCode,
        params.demolink,
        msg.sender,
        params.telegram,
        params.discord,
        params.email);
            
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

    function getProposal(uint proposalId) public view returns (
        uint,
        string memory,
        string memory,
        string memory,
        string memory,
        uint,
        uint,
        uint,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        address,
        bool
    ) {
        Proposal storage proposal = IdProposal[proposalId];
        return (
            proposal.proposalId,    
            proposal.dAppName,
            proposal.description,
            proposal.category,
            proposal. chain,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.endtime,
            proposal.url,
            proposal.sourceCode,
            proposal.demolink,
            proposal.telegram,
            proposal.discord,
            proposal.email,
            proposal.proposer,
            proposal.isApproved
        );
    }


    function getAllProposalIds() public view returns (uint[] memory) {
        uint[] memory ids = new uint[](totalProposals);
        for (uint i = 0; i < totalProposals; i++) {
            ids[i] = i;
        }
        return ids;
    }

    //function to get registered dApp
    function getdApp(uint _dAppId) public view returns (dApp memory) {
        return dAppsMap[_dAppId];
    }

    //function to get all dApps
    function getAllDapps() public view returns (dApp[] memory) {
        return dAppsList;
    }

  // Function to check if a username exists
    function Exist(string memory _userName) public view returns (bool) {
        return ourUsers[_userName].myAddress != address(0);
    }

    //function to update downloads
    function download(uint _dAppId) public {
        require(registered(msg.sender), "Please signUp to get tokens");
        require(DownloadsUint[_dAppId].myAddress != msg.sender, "Error message");
        Downloads storage newDownload = DownloadsUint[_dAppId];
        newDownload.dAppId = _dAppId;
        newDownload.myAddress = msg.sender;
        userAddress[msg.sender].Downloads++;
        totalDownloads++;
        DownloadsArray.push(newDownload);   
    }

    // Function to check if an address is registered
    function registered(address _myAdd) public view returns (bool) {
        return userAddress[_myAdd].myAddress != address(0);
    }


    //function to withdraw from the contract
    function withdraw() public payable onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        (bool sent, ) = owner.call{value: address(this).balance}("");
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
    return false;
    }

}