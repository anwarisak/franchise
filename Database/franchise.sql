-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 06:20 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `franchise`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_charging` (IN `_month_id` VARCHAR(50), IN `_year` VARCHAR(50), IN `_description` TEXT, IN `_account_id` INT, IN `_users_id` VARCHAR(50))   BEGIN
INSERT IGNORE INTO `charge`(`employee_id`, `job_title_id`, `amount`, `month_id`, `year`, `description`, `account_id`,`users_id`, `date`)
SELECT e.employee_id,j.job_title_id,j.salary,_month_id,_year,_description,_account_id,_users_id,
CURRENT_DATE from employee e JOIN job_title j on e.title_id=j.title_id;

if(row_count()> 0)THEN
SELECT "Registered" as msg;

END IF;
 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `_username` VARCHAR(200), IN `_password` INT(255))   BEGIN

if exists( select * from users where username = _username and password = md5(_password))then
if exists( select * from users where username = _username and status = 'active')then 

select * from users where username = _username ;
else
select 'locked 'message;
end if;
else
select 'deny 'message;
end if;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `read_balance` (`_account_id` INT) RETURNS INT(11)  BEGIN
set @balance=0.00;
SELECT sum(balance)into @balance from account
WHERE account_id =_account_id;
RETURN @balance;

END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `read_salary` () RETURNS DECIMAL(11,2)  BEGIN
set @salary=0.00;

SELECT sum(salary)into @salary from job_title;

RETURN @salary;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `holder_name` varchar(50) DEFAULT NULL,
  `balance` decimal(9,2) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `number`, `bank`, `holder_name`, `balance`, `date`) VALUES
(1, 222222, 'dahabshiil', 'geedi', '5000.00', '2023-06-07 17:19:01'),
(2, 3333, 'salaam bank', 'faarax', '900.00', '2023-06-07 17:40:46');

-- --------------------------------------------------------

--
-- Table structure for table `assign_job`
--

CREATE TABLE `assign_job` (
  `assign_job_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `job_title_id` int(11) DEFAULT NULL,
  `hours` int(11) DEFAULT NULL,
  `assign_job_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assign_job`
--

INSERT INTO `assign_job` (`assign_job_id`, `employee_id`, `branch_id`, `shift_id`, `job_title_id`, `hours`, `assign_job_date`) VALUES
(1, 2, 1, 2, 1, 9, '2023-06-07 20:39:26');

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `bill_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `amount` decimal(9,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branch_id` int(11) NOT NULL,
  `country` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branch_id`, `country`, `address`, `city`) VALUES
(1, 'somalia', 'bakaaro d1', 'banaadir');

-- --------------------------------------------------------

--
-- Table structure for table `charge`
--

CREATE TABLE `charge` (
  `charge_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `job_title_id` int(11) DEFAULT NULL,
  `month_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `account_id` int(11) NOT NULL,
  `amount` decimal(9,2) DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contract`
--

CREATE TABLE `contract` (
  `contract_id` int(11) NOT NULL,
  `franchisee_id` int(11) DEFAULT NULL,
  `franchise_type_id` int(11) DEFAULT NULL,
  `franchiser` varchar(50) DEFAULT NULL,
  `comission_fee` decimal(9,2) DEFAULT NULL,
  `contract_date` date DEFAULT NULL,
  `contract_expire` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contract`
--

INSERT INTO `contract` (`contract_id`, `franchisee_id`, `franchise_type_id`, `franchiser`, `comission_fee`, `contract_date`, `contract_expire`) VALUES
(2, 5, 2, 'anwar', '600.00', '2023-06-07', '2023-06-09');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `fristname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `fristname`, `lastname`, `phone`, `state`, `city`) VALUES
(1, 'anwar', 'isak', '909', 'mm', 'mm'),
(2, 'moahamed', 'moha', '909', 'mm', 'mm'),
(3, 'jamaal', 'geedi', '6544332', 'mogadisho', 'Banaadir');

-- --------------------------------------------------------

--
-- Table structure for table `franchisee`
--

CREATE TABLE `franchisee` (
  `franchisee_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `franchise_type_id` int(11) DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `franchisee`
--

INSERT INTO `franchisee` (`franchisee_id`, `name`, `address`, `city`, `country`, `franchise_type_id`, `reg_date`) VALUES
(1, 'Inventory', 'bakaaro', 'banaadir', 'Somalia', 1, '2023-06-07 09:09:06'),
(2, 'managerial', 'karaan', 'Darulsalaam', 'Somalia', 2, '2023-06-07 17:05:57'),
(3, 'hfhf', 'jaee', 'Darulsalaam', 'Somalia', 2, '2023-06-07 17:05:47'),
(4, 'iibgeen', 'Banaadir ', 'Darulsalaam', 'Somalia', 1, '2023-06-07 17:05:28'),
(5, 'marketing', 'Banaadir Guriga Xaawo', 'xamar', 'Somalia', 2, '2023-06-07 12:13:29');

-- --------------------------------------------------------

--
-- Table structure for table `franchise_type`
--

CREATE TABLE `franchise_type` (
  `franchise_type_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `franchise_type`
--

INSERT INTO `franchise_type` (`franchise_type_id`, `name`) VALUES
(1, 'Rent House'),
(2, 'Maalgalin');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_type_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `item_cost` decimal(9,2) DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `added_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_type_id`, `name`, `quantity`, `item_cost`, `price`, `added_date`) VALUES
(1, 1, 'dhalo', 3, '300.00', '400.00', '2023-06-07'),
(2, 1, 'televion', 2, '200.00', '250.00', '2023-06-07');

-- --------------------------------------------------------

--
-- Table structure for table `item_type`
--

CREATE TABLE `item_type` (
  `item_type_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_type`
--

INSERT INTO `item_type` (`item_type_id`, `name`) VALUES
(1, 'Okiyaalo'),
(2, 'tv'),
(3, 'jenis');

-- --------------------------------------------------------

--
-- Table structure for table `job_title`
--

CREATE TABLE `job_title` (
  `job_title_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `salary` decimal(9,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_title`
--

INSERT INTO `job_title` (`job_title_id`, `name`, `salary`) VALUES
(1, 'vp', '1200.00'),
(2, 'manager', '900.00');

-- --------------------------------------------------------

--
-- Table structure for table `month`
--

CREATE TABLE `month` (
  `month_id` int(11) NOT NULL,
  `month_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `month`
--

INSERT INTO `month` (`month_id`, `month_name`) VALUES
(1, 'jan'),
(2, 'feb'),
(3, 'march'),
(4, 'april'),
(5, 'may'),
(6, 'jun'),
(7, 'jully'),
(8, 'Aug'),
(9, 'sept');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `franchisee_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `amount` decimal(9,2) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orders_id`, `franchisee_id`, `item_id`, `quantity`, `amount`, `order_date`) VALUES
(1, 2, 2, 5, '400.00', '2023-06-08 08:50:48'),
(2, 1, 1, 5, '300.00', '2023-06-08 09:12:35');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `franchisee_id` int(11) DEFAULT NULL,
  `amount` decimal(9,2) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `payment_method_id` int(11) NOT NULL,
  `method_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`payment_method_id`, `method_name`) VALUES
(1, 'Banking'),
(2, 'EVC'),
(3, 'saving'),
(4, 'sav'),
(5, 'hgh');

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `shift_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`shift_id`, `name`) VALUES
(1, 'subax'),
(2, 'galab');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` varchar(255) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active',
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `username`, `employee_id`, `password`, `image`, `status`, `date`) VALUES
('1', 'ali', 2, '81dc9bdb52d04dc20036dbd8313ed055', '1.png', 'active', '2023-06-07 17:42:38'),
('2', 'mo', 2, '81dc9bdb52d04dc20036dbd8313ed055', '2.png', 'active', '2023-06-08 14:19:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `assign_job`
--
ALTER TABLE `assign_job`
  ADD PRIMARY KEY (`assign_job_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `shift_id` (`shift_id`),
  ADD KEY `job_title_id` (`job_title_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `charge`
--
ALTER TABLE `charge`
  ADD PRIMARY KEY (`charge_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `job_title_id` (`job_title_id`),
  ADD KEY `month_id` (`month_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`contract_id`),
  ADD KEY `franchise_type_id` (`franchise_type_id`),
  ADD KEY `franchisee_id` (`franchisee_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `franchisee`
--
ALTER TABLE `franchisee`
  ADD PRIMARY KEY (`franchisee_id`),
  ADD KEY `franchise_type_id` (`franchise_type_id`);

--
-- Indexes for table `franchise_type`
--
ALTER TABLE `franchise_type`
  ADD PRIMARY KEY (`franchise_type_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `item_type_id` (`item_type_id`);

--
-- Indexes for table `item_type`
--
ALTER TABLE `item_type`
  ADD PRIMARY KEY (`item_type_id`);

--
-- Indexes for table `job_title`
--
ALTER TABLE `job_title`
  ADD PRIMARY KEY (`job_title_id`);

--
-- Indexes for table `month`
--
ALTER TABLE `month`
  ADD PRIMARY KEY (`month_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`),
  ADD KEY `franchisee_id` (`franchisee_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `franchisee_id` (`franchisee_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`payment_method_id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`shift_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `assign_job`
--
ALTER TABLE `assign_job`
  MODIFY `assign_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `charge`
--
ALTER TABLE `charge`
  MODIFY `charge_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract`
--
ALTER TABLE `contract`
  MODIFY `contract_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `franchisee`
--
ALTER TABLE `franchisee`
  MODIFY `franchisee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `franchise_type`
--
ALTER TABLE `franchise_type`
  MODIFY `franchise_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `item_type`
--
ALTER TABLE `item_type`
  MODIFY `item_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_title`
--
ALTER TABLE `job_title`
  MODIFY `job_title_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `month`
--
ALTER TABLE `month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `payment_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assign_job`
--
ALTER TABLE `assign_job`
  ADD CONSTRAINT `assign_job_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assign_job_ibfk_2` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`shift_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assign_job_ibfk_3` FOREIGN KEY (`job_title_id`) REFERENCES `job_title` (`job_title_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assign_job_ibfk_4` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE;

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE;

--
-- Constraints for table `charge`
--
ALTER TABLE `charge`
  ADD CONSTRAINT `charge_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `charge_ibfk_2` FOREIGN KEY (`job_title_id`) REFERENCES `job_title` (`job_title_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `charge_ibfk_3` FOREIGN KEY (`month_id`) REFERENCES `month` (`month_id`),
  ADD CONSTRAINT `charge_ibfk_4` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`);

--
-- Constraints for table `contract`
--
ALTER TABLE `contract`
  ADD CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`franchise_type_id`) REFERENCES `franchise_type` (`franchise_type_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_ibfk_2` FOREIGN KEY (`franchisee_id`) REFERENCES `franchisee` (`franchisee_id`);

--
-- Constraints for table `franchisee`
--
ALTER TABLE `franchisee`
  ADD CONSTRAINT `franchisee_ibfk_1` FOREIGN KEY (`franchise_type_id`) REFERENCES `franchise_type` (`franchise_type_id`) ON UPDATE CASCADE;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`item_type_id`) REFERENCES `item_type` (`item_type_id`) ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`franchisee_id`) REFERENCES `franchisee` (`franchisee_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`franchisee_id`) REFERENCES `franchisee` (`franchisee_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`payment_method_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
