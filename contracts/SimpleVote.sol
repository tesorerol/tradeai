// SPDX-License-Identifier: MIT
// Develop By Tesorerol
pragma solidity 0.8.5;

contract VoteSimple {
    uint256 public VoteForAprove;
    uint256 public VoteYes;
    uint256 public VoteNo;
    uint256 public TimeToVote;
    address public _owner;
    bool public CloseVote;
    mapping (address => bool) public UserVote;

    event SubmitVote(address User,uint256 vote);

    modifier OnylOwner {
        require(msg.sender == _owner,"You are not Owner");
        _;
    }

    constructor(uint256 _time,uint256 _voteForAprove) {
        VoteForAprove = _voteForAprove;
        TimeToVote = _time;
        _owner = msg.sender;
    }


    function ChangeVoteAprove(uint256 _voteAprove) public OnylOwner{
        VoteForAprove = _voteAprove;
    }

    function ChangeTimeVote(uint256 _time) public OnylOwner{
        TimeToVote = _time;
    }

    function EmitVote(uint256 _vote) public {
        require(_vote == 1 ||_vote == 2,"invalid Vote");
        require(!UserVote[msg.sender],"You have al ready vote");
        require(!CloseVote,"Vote al Ready Done");

        if (_vote == 1) {
            VoteYes +=1;
        }

         if (_vote == 2) {
            VoteNo +=1;
        }

        if(VoteYes + VoteNo > VoteForAprove / 2){

        }

        UserVote[msg.sender]=true;
    }

}