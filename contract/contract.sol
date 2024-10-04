// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CountContract {
    // State variable to store the count
    uint256 public count;

    // Event to emit when count is incremented
    event CountIncremented(uint256 newCount);

    // Initialize the count to 0 (optional constructor for deployment)
    constructor() {
        count = 0;
    }

    // Function to initialize the count, in case it's needed as a separate function
    function initialize() public {
        count = 0;
    }

    // Function to increment the count
    function increment() public {
        count += 1;
        emit CountIncremented(count);
    }

    // Function to retrieve the current count (getter function is redundant but explicit here)
    function getCount() public view returns (uint256) {
        return count;
    }
}
