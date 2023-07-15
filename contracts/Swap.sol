// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Swap contract
contract SwapBeNFt is Ownable,ReentrancyGuard {
    using SafeMath for uint256;
    IERC20 public BeNft;
    bool _lock;
    uint256 price = 200000000000000000;
    address WalletMain;
    mapping(address => uint256) public BuyAmount;
    mapping(address => bool) public TokenAcept;
    mapping(address => Vesting) public UserVesting;
    event sellBenft(address seller,uint256 _amount);

    constructor(address _BeNFt, address _walletMain) {
        BeNft = IERC20(_BeNFt);
        WalletMain = _walletMain;
        TokenAcept[0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56]=true;
        TokenAcept[0x55d398326f99059fF775485246999027B3197955]=true;
    }

    struct Vesting {
        uint256 amount;
        uint256 time;
        uint256 numberVesting;
        uint256 tansferAmount;
        uint256 remaing;
    }


    modifier ContractLock() {
        require(!_lock, "Venta Pausada");
        _;
    }

    function AddTokenAccept(address _address) public onlyOwner {
        TokenAcept[_address] = true;
    }

    //Locks the contract for owner for the amount of time provided
    function lock() external onlyOwner {
        _lock = true;
    }

    //Unlocks the contract for owner when _lockTime is exceeds
    function unlock() external onlyOwner {
        _lock = false;
    }

    // Swaps tokens based on current BNB price
    function Swap(uint256 _amount,address _token) public nonReentrant ContractLock {
        BuyAmount[msg.sender] += _amount;
        require(TokenAcept[_token], "Invalid Token");
        require(
            IERC20(_token).balanceOf(msg.sender) >= _amount,
            "Insuficient balance of select token"
        );
        require(
            _amount < 4001 ether,
            "Limit of buy 4000"
        );
        require(
            BuyAmount[msg.sender] < 4001 ether,
            "You have max amount buy"
        );

        Vesting memory UserValues = UserVesting[msg.sender];

        

        uint256 TransferAmount = (_amount.mul(1 ether) / price).div(10**9);

        if(UserValues.time==0){
            UserValues.time = block.timestamp + 30 days;
        }

        UserValues.amount += TransferAmount;

        UserValues.remaing += TransferAmount;

        UserValues.numberVesting = 0;

        UserValues.tansferAmount = UserValues.remaing.div(3);
    
        UserVesting[msg.sender] = UserValues;

        IERC20(_token).transferFrom(msg.sender,address(this), _amount);

        emit sellBenft(msg.sender,_amount);
    }

    function ClaimVesting() public{
        Vesting memory UserValues = UserVesting[msg.sender];
        require(UserValues.time < block.timestamp,"its no time");
        require(UserValues.numberVesting<4,"you have all ready claimed");

        UserValues.numberVesting += 1;

        UserValues.time = block.timestamp + 30 days;

        UserValues.remaing -= UserValues.tansferAmount;

        UserVesting[msg.sender] = UserValues;

        BeNft.transfer(address(this), UserValues.tansferAmount);
    }


    function RecoverAnyToken(address _token) external onlyOwner {
        IERC20(_token).transfer(owner(), IERC20(_token).balanceOf(address(this)));
    }

}
