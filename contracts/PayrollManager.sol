// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PayrollManager is Ownable, ReentrancyGuard {
    struct Employee {
        address wallet;
        uint256 salary;
        uint256 lastPayment;
        bool active;
    }

    struct Employer {
        bool registered;
        uint256 balance;
    }

    mapping(address => Employer) public employers;
    mapping(address => mapping(address => Employee)) public employees; // employer -> employee
    
    event EmployerRegistered(address indexed employer);
    event EmployeeAdded(address indexed employer, address indexed employee, uint256 salary);
    event SalaryPaid(address indexed employer, address indexed employee, uint256 amount);
    event FundsDeposited(address indexed employer, uint256 amount);
    event EmployeeDeactivated(address indexed employer, address indexed employee);

    modifier onlyRegisteredEmployer() {
        require(employers[msg.sender].registered, "Not a registered employer");
        _;
    }

    function registerAsEmployer() external {
        require(!employers[msg.sender].registered, "Already registered");
        employers[msg.sender].registered = true;
        emit EmployerRegistered(msg.sender);
    }

    function addEmployee(address _employee, uint256 _salary) external onlyRegisteredEmployer {
        require(_employee != address(0), "Invalid address");
        require(_salary > 0, "Invalid salary");
        require(!employees[msg.sender][_employee].active, "Employee already exists");

        employees[msg.sender][_employee] = Employee({
            wallet: _employee,
            salary: _salary,
            lastPayment: block.timestamp,
            active: true
        });

        emit EmployeeAdded(msg.sender, _employee, _salary);
    }

    function depositFunds() external payable onlyRegisteredEmployer {
        employers[msg.sender].balance += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function paySalary(address _employee) external onlyRegisteredEmployer nonReentrant {
        Employee storage employee = employees[msg.sender][_employee];
        require(employee.active, "Employee not active");
        require(block.timestamp >= employee.lastPayment + 30 days, "Too early");
        require(employers[msg.sender].balance >= employee.salary, "Insufficient funds");

        employers[msg.sender].balance -= employee.salary;
        employee.lastPayment = block.timestamp;
        
        (bool success, ) = _employee.call{value: employee.salary}("");
        require(success, "Transfer failed");

        emit SalaryPaid(msg.sender, _employee, employee.salary);
    }

    function deactivateEmployee(address _employee) external onlyRegisteredEmployer {
        require(employees[msg.sender][_employee].active, "Employee not active");
        employees[msg.sender][_employee].active = false;
        emit EmployeeDeactivated(msg.sender, _employee);
    }

    function getEmployeeDetails(address _employer, address _employee) external view returns (
        address wallet,
        uint256 salary,
        uint256 lastPayment,
        bool active
    ) {
        Employee memory emp = employees[_employer][_employee];
        return (emp.wallet, emp.salary, emp.lastPayment, emp.active);
    }

    function getEmployerBalance(address _employer) external view returns (uint256) {
        return employers[_employer].balance;
    }
}
