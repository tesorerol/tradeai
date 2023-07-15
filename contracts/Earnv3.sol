// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/IERC20.sol)

pragma solidity 0.8.5;

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**0xcCc743cd299269373971bF17043cCc173c603e98
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

contract EARNPRIVATE is Ownable,ReentrancyGuard {
    using SafeMath for uint256;
    address public walletPool;
    address TokenRecibe;
    address Wallet1;
    address Wallet2;
    uint256 public recolect;
    uint256 public limit;
    uint256 public MaxAmount;
    uint256 public MinAmount;
    uint256 public PercentEarn;
    uint256 private secondPerDay=86400;
    uint256 private TimeDays;
    bool _lock;
    bool _initialized;
    bool _whiteList;
    mapping(address => Users[]) public balanceUser;

    mapping(address => bool) public whiteList;
    mapping(address => uint256) public depositCount;

    
    event DepositMade(address indexed user, uint256 amount, uint256 depositId);
    event WithdrawalMade(address indexed user, uint256 amount, uint256 depositId);
    event earlyClaim(address user, uint256 from, uint256 to);

    struct Users {
        uint256 Amount;
        uint256 initTime;
        uint256 finishTime;
        uint256 Earn;
    }

        modifier ContractLock() {
        require(!_lock, "Paused Earn");
        _;
    }


    function ChangeWalletRecibe(address _wallet) public onlyOwner {
        walletPool= _wallet;
    }

    function ChangeMinAmount(uint256 _amount) public onlyOwner {
        MinAmount = _amount;
    }

    function ChangeMaxAmount(uint256 _amount) public onlyOwner {
        MaxAmount = _amount;
    }

    function ChangeLimitAmount(uint256 _amount) public onlyOwner {
        limit = _amount;
    }

    function ChangeRecolect(uint256 _recolect) public onlyOwner {
        recolect = _recolect;
    }

    function ChangeDays(uint256 _days) public onlyOwner {
        TimeDays = _days * secondPerDay;
    }

    function EnableWhiteList() public onlyOwner {
        _whiteList=true;
    }

    function DisableWhitelist() public onlyOwner {
        _whiteList=false;
    }

    function ViewDay() public view returns(uint256){
        return TimeDays / secondPerDay;
    }

    function addUserWhiteList(address _wallet) public onlyOwner {
        whiteList[_wallet] = true;
    }

    function addToWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            address addr = addresses[i];
            whiteList[addr] = true;
        }
    }

    function removeFromWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            address addr = addresses[i];
            whiteList[addr] = false;
        }
    }

    function ChangePercent(uint256 _percent) public onlyOwner {
        require(_percent>0,"the number than great 0");
        PercentEarn = _percent;
    }

    //Locks the contract for owner for the amount of time provided
    function lock() external onlyOwner {
        _lock = !_lock;
    }

    constructor(address _walletPool, address _TokenRecibe, bool _whiteListed) {
        walletPool = _walletPool;
        TokenRecibe=_TokenRecibe; 
        _whiteList=_whiteListed;
    }

    function Initialized(uint256 _limit,uint256 _maxAmount, uint256 _minAmount, uint256 _percent,uint256 _days) public onlyOwner{
        require(!_initialized,"Pool has been initialized");
        limit = _limit;
        MaxAmount = _maxAmount;
        MinAmount = _minAmount;
        PercentEarn = _percent;
        TimeDays = _days * secondPerDay;
        _initialized=true;
    }
    
    function Deposit(uint256 _amount) external nonReentrant ContractLock {
	    // Check if the contract is initialized
	    require(_initialized, "Pool is not initialized");

	    // Calculate the deposit finish time
	    uint256 finishTime = block.timestamp + TimeDays;

	    // Check if the amount is greater than zero
	    require(_amount > 0, "Amount must be greater than zero");

	    // Check if the amount exceeds the maximum limit
	    require(_amount <= MaxAmount, "Amount exceeds maximum limit");

	    // Check if the amount is equal to or above the minimum limit
	    require(_amount >= MinAmount, "Amount is below minimum limit");

	    // Check if the deposit amount plus the total collected amount doesn't exceed the limit
	    require(recolect + _amount <= limit, "Pool limit has been reached");

	    // Create a data structure to store the deposit information
	    Users memory userInfo = Users({
		Amount: _amount,
		initTime: block.timestamp,
		finishTime: finishTime,
		Earn: 0
	    });

	    // Calculate the earnings based on the deposit amount and the corresponding percentage
	    userInfo.Earn = _amount + _amount.mul(PercentEarn).div(100);

	    // Add the deposit to the user's deposit list
	    balanceUser[msg.sender].push(userInfo);

	    // Increment the user's deposit count
	    depositCount[msg.sender]++;

	    // Update the total collected amount
	    recolect += _amount;

	    // Emit the DepositMade event to notify the deposit completion
	    emit DepositMade(msg.sender, _amount, depositCount[msg.sender]);

	    // Transfer the tokens from the sender to the contract
	    bool success = IERC20(TokenRecibe).transferFrom(msg.sender, walletPool, _amount);
	    require(success, "Transfer failed");
	}

	function EarnDeposit(uint256 _depositId) external nonReentrant ContractLock {
	    require(_initialized, "Pool is not initialized");

	    Users[] storage userDeposits = balanceUser[msg.sender];
	    require(_depositId < userDeposits.length, "Invalid deposit ID");

	    Users memory userInfo = userDeposits[_depositId];
        delete userDeposits[_depositId];
	    require(userInfo.Amount > 0, "You have already withdrawn your capital and profits");

	    uint256 finishTime = userInfo.finishTime;
	    require(finishTime <= block.timestamp, "You need to wait for the deposit to finish before withdrawing");

	    uint256 amountTransfer = userInfo.Earn;

	    // Emit the WithdrawalMade event
	    emit WithdrawalMade(msg.sender, amountTransfer, _depositId);

	    bool success = IERC20(TokenRecibe).transfer(msg.sender, amountTransfer);
	    require(success, "Transfer failed");
	}

        function RecoverTokens(address _tokens) public onlyOwner{
	    	bool success = IERC20(_tokens).transfer(msg.sender, IERC20(_tokens).balanceOf(address(this)));
	    	require(success, "Transfer failed");
	}
	function EarlyClaim(address _user, uint256 _depositId) public onlyOwner {
		// Get the mapping bucket information
		Users memory userInfo = balanceUser[_user][_depositId];
		// Update the deposit completion time
		userInfo.finishTime = block.timestamp;
		// Update bucket information in mapping
		balanceUser[_user][_depositId] = userInfo;
		emit earlyClaim(_user, userInfo.finishTime, block.timestamp);
	}


    	function Migration(address _user, uint256 _depositId, uint256 _amount, uint256 _initTime, uint256 _finishTime, uint256 _earn) public onlyOwner {
		// Store repository information in mapping
		balanceUser[_user][_depositId] = Users(_amount, _initTime, _finishTime, _earn);
    	}


}
