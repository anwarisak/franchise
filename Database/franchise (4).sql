-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2023 at 01:09 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `charge_repo` (IN `_month_name` VARCHAR(100))   BEGIN

SELECT concat(e.fristname,' ',e.lastname) AS employee_name,j.name AS jop_name,m.month_name,ch.year,ch.description,a.bank,ch.user_id AS user,ch.date FROM charge ch JOIN employee e ON ch.employee_id=e.employee_id JOIN job_title j ON ch.job_title_id=j.job_title_id JOIN month m ON ch.month_id=m.month_id JOIN account a ON ch.Account_id=a.account_id WHERE m.month_name=_month_name; 


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_charging` (IN `_month_id` INT, IN `_year` VARCHAR(100), IN `_description` TEXT, IN `_Account_id` INT, IN `_user_id` VARCHAR(100))   BEGIN
if(read_salary() > read_balance(_Account_id))THEN
SELECT "Deny" as msg;
else
INSERT IGNORE INTO  `charge`(`employee_id`, `job_title_id`, `amount`, `month_id`, `year`, `description`, `Account_id`, `user_id`,`date`)
SELECT e.employee_id,j.job_title_id,j.salary,_month_id,_year,_description,_Account_id,_user_id,
CURRENT_DATE from employee e JOIN job_title  j on e.job_title_id=j.job_title_id;
IF(row_count()>0)THEN
SELECT "Registered" as msg;
ELSE
SELECT "NOt" as msg;
END IF;    
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_item_price` (IN `_item_id` INT)   BEGIN

SELECT i.price from item i  WHERE i.item_id=_item_id;

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `order_repo` (IN `_franchise_name` VARCHAR(100))   BEGIN
if(_franchise_name = ' ')THEN

SELECT f.name AS franchisee_name,i.name AS item_name,o.quantity,o.amount FROM orders o JOIN franchisee f ON o.franchisee_id=f.franchisee_id JOIN item i ON o.item_id=i.item_id;

ELSE

SELECT f.name AS franchisee_name,i.name AS item_name,o.quantity,o.amount FROM orders o JOIN franchisee f ON o.franchisee_id=f.franchisee_id JOIN item i ON o.item_id=i.item_id WHERE f.name=_franchise_name;

END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payment_repo` (IN `_franchise_name` VARCHAR(100))   BEGIN
if(_franchise_name = ' ')THEN

SELECT f.name AS franchisee_name,p.amount,a.bank,pa.method_name FROM payment p JOIN franchisee f ON p.franchisee_id=f.franchisee_id JOIN account a ON p.account_id=a.account_id JOIN payment_method pa ON p.payment_method_id=pa.payment_method_id;

ELSE

SELECT f.name AS franchisee_name,p.amount,a.bank,pa.method_name FROM payment p JOIN franchisee f ON p.franchisee_id=f.franchisee_id JOIN account a ON p.account_id=a.account_id JOIN payment_method pa ON p.payment_method_id=pa.payment_method_id WHERE f.name=_franchise_name;

END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_total_amount` (IN `_franchaise_id` INT)   BEGIN

SELECT o.amount as total_amount FROM orders o WHERE o.franchisee_id=_franchaise_id;


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
(1, 12345, 'dahabshiil', 'kaafi abdi', '1000.00', '2023-07-05 21:49:10');

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `bill_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `Amount` decimal(12,0) DEFAULT NULL,
  `user` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`bill_id`, `employee_id`, `Amount`, `user`) VALUES
(1, 1, '2500', 'FAATIH'),
(2, 4, '120', 'anwar');

--
-- Triggers `bill`
--
DELIMITER $$
CREATE TRIGGER `update_active` AFTER INSERT ON `bill` FOR EACH ROW BEGIN

update charge set active=1 WHERE
employee_id=new.employee_id;


END
$$
DELIMITER ;

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
(1, 'fghgf', 'hgg', 'gfhg'),
(2, 'gdfgdf', 'dfsdf', 'fsdf');

-- --------------------------------------------------------

--
-- Table structure for table `charge`
--

CREATE TABLE `charge` (
  `charge_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `job_title_id` int(11) DEFAULT NULL,
  `amount` decimal(12,0) DEFAULT NULL,
  `month_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `Account_id` int(11) NOT NULL,
  `user_id` varchar(40) NOT NULL,
  `active` int(11) NOT NULL DEFAULT 0,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `charge`
--

INSERT INTO `charge` (`charge_id`, `employee_id`, `job_title_id`, `amount`, `month_id`, `year`, `description`, `Account_id`, `user_id`, `active`, `date`) VALUES
(1, 1, 1, '2500', 1, 2023, 'mushar', 1, 'FAATIH', 1, '2023-06-21 14:34:45'),
(2, 3, 1, '120', 1, 2023, 'mm', 1, 'anwar', 0, '2023-07-05 21:00:00'),
(3, 4, 1, '120', 1, 2023, 'mm', 1, 'anwar', 1, '2023-07-05 22:56:45'),
(4, 5, 2, '34', 1, 2023, 'mm', 1, 'anwar', 0, '2023-07-05 21:00:00'),
(5, 6, 2, '34', 1, 2023, 'mm', 1, 'anwar', 0, '2023-07-05 21:00:00');

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
(1, 2, 1, 'dfdf', '56.00', '2023-07-06', '2023-07-06');

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
  `city` varchar(50) DEFAULT NULL,
  `branch_id` int(11) NOT NULL,
  `job_title_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `fristname`, `lastname`, `phone`, `state`, `city`, `branch_id`, `job_title_id`) VALUES
(1, 'anwar', 'isak', '909', 'mm', 'mm', 0, 0),
(2, 'moahamed', 'moha', '909', 'mm', 'mm', 0, 0),
(3, 'fggh', 'gf', '545', 'vgf', 'cv', 1, 1),
(4, 'japaan', 'cabe', '555555', 'seypiano', 'banaadir', 1, 1),
(5, 'fgdfg', 'dfdsfsdf', '545', 'jghjh', 'gfdg', 1, 2),
(6, 'dfgdsf', 'fghgf', '5656', 'hffd', 'fdghd', 1, 2);

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
(1, 'sdfd', 'dgdf', 'dsfds', 'sdsfddf', 1, '2023-07-05 20:51:10'),
(2, 'dfdf', 'hhgh', 'fdgfh', 'dfdg', 1, '2023-07-05 20:52:09'),
(3, 'sdssd', 'sdd', 'zxz', 'sds', 1, '2023-07-05 21:18:09');

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
(1, 'export'),
(2, 'jk');

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
(1, 1, 'fdf', 3, '54.00', '433.00', '2023-07-06');

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
(1, 'kkk'),
(2, 'jj');

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
(1, 'vp', '120.00'),
(2, 'dfsd', '34.00'),
(3, 'xzxzx', '45.00');

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
(1, 'Jan'),
(2, 'Feb');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `franchisee_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `amount` decimal(12,0) DEFAULT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orders_id`, `franchisee_id`, `item_id`, `quantity`, `amount`, `status`, `order_date`) VALUES
(1, 1, 1, 1200, '120000', 'paid', '2023-06-21 14:39:03'),
(2, 2, 1, 4, '1732', 'paid', '2023-07-05 23:06:39');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `franchisee_id` int(11) DEFAULT NULL,
  `amount` decimal(9,2) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `franchisee_id`, `amount`, `account_id`, `payment_method_id`) VALUES
(1, 1, '120000.00', 1, 1),
(2, 2, '1732.00', 1, 2);

--
-- Triggers `payment`
--
DELIMITER $$
CREATE TRIGGER `update_payment` AFTER INSERT ON `payment` FOR EACH ROW BEGIN

UPDATE orders o set o.status='paid' WHERE o.franchisee_id=new.franchisee_id;


END
$$
DELIMITER ;

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
(1, 'EVC'),
(2, 'E-dahab');

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
('USR001', 'japaan', 4, '81dc9bdb52d04dc20036dbd8313ed055', 'USR001.png', 'active', '2023-07-05 20:33:13'),
('USR002', 'mo', 2, 'd41d8cd98f00b204e9800998ecf8427e', 'USR002.png', 'active', '2023-07-05 20:57:27'),
('USR003', 'anwar', 1, '81dc9bdb52d04dc20036dbd8313ed055', 'USR003.png', 'active', '2023-07-05 21:12:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `account_id` (`user`),
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
  ADD UNIQUE KEY `employee_id_2` (`employee_id`,`month_id`,`year`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `job_title_id` (`job_title_id`),
  ADD KEY `month_id` (`month_id`),
  ADD KEY `account_id` (`Account_id`);

--
-- Indexes for table `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`contract_id`),
  ADD KEY `franchise_type_id` (`franchise_type_id`);

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
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `charge`
--
ALTER TABLE `charge`
  MODIFY `charge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contract`
--
ALTER TABLE `contract`
  MODIFY `contract_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `franchisee`
--
ALTER TABLE `franchisee`
  MODIFY `franchisee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `franchise_type`
--
ALTER TABLE `franchise_type`
  MODIFY `franchise_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `item_type`
--
ALTER TABLE `item_type`
  MODIFY `item_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job_title`
--
ALTER TABLE `job_title`
  MODIFY `job_title_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `month`
--
ALTER TABLE `month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `payment_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contract`
--
ALTER TABLE `contract`
  ADD CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`franchise_type_id`) REFERENCES `franchise_type` (`franchise_type_id`) ON UPDATE CASCADE;

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
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`franchisee_id`) REFERENCES `franchisee` (`franchisee_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`payment_method_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
