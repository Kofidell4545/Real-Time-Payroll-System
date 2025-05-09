// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BonusVault is Ownable, ReentrancyGuard {
    struct Bonus {
        uint256 amount;
        uint256 unlockTime;
        bool claimed;
        string description;
    }

    mapping(address => mapping(address => Bonus[])) public employeeBonuses; // employer -> employee -> bonuses
    mapping(address => uint256) public employerBalances;

    event BonusCreated(address indexed employer, address indexed employee, uint256 amount, uint256 unlockTime);
    event BonusClaimed(address indexed employer, address indexed employee, uint256 amount);
    event FundsDeposited(address indexed employer, uint256 amount);

    function depositFunds() external payable {
        employerBalances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function createBonus(
        address _employee,
        uint256 _amount,
        uint256 _unlockTime,
        string memory _description
    ) external {
        require(_employee != address(0), "Invalid employee address");
        require(_amount > 0, "Invalid bonus amount");
        require(_unlockTime > block.timestamp, "Invalid unlock time");
        require(employerBalances[msg.sender] >= _amount, "Insufficient funds");

        employerBalances[msg.sender] -= _amount;

        employeeBonuses[msg.sender][_employee].push(Bonus({
            amount: _amount,
            unlockTime: _unlockTime,
            claimed: false,
            description: _description
        }));

        emit BonusCreated(msg.sender, _employee, _amount, _unlockTime);
    }

    function claimBonus(address _employer, uint256 _bonusIndex) external nonReentrant {
        Bonus[] storage bonuses = employeeBonuses[_employer][msg.sender];
        require(_bonusIndex < bonuses.length, "Invalid bonus index");
        require(!bonuses[_bonusIndex].claimed, "Bonus already claimed");
        require(block.timestamp >= bonuses[_bonusIndex].unlockTime, "Bonus not yet unlocked");

        uint256 amount = bonuses[_bonusIndex].amount;
        bonuses[_bonusIndex].claimed = true;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit BonusClaimed(_employer, msg.sender, amount);
    }

    function getBonusCount(address _employer, address _employee) external view returns (uint256) {
        return employeeBonuses[_employer][_employee].length;
    }

    function getBonusDetails(
        address _employer,
        address _employee,
        uint256 _bonusIndex
    ) external view returns (
        uint256 amount,
        uint256 unlockTime,
        bool claimed,
        string memory description
    ) {
        Bonus memory bonus = employeeBonuses[_employer][_employee][_bonusIndex];
        return (bonus.amount, bonus.unlockTime, bonus.claimed, bonus.description);
    }

    function getEmployerBalance(address _employer) external view returns (uint256) {
        return employerBalances[_employer];
    }
}
