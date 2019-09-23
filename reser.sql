-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2019 at 05:56 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reser`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `month` varchar(20) NOT NULL,
  `staff_salary` double NOT NULL,
  `resturant_income` double NOT NULL,
  `room_income` double NOT NULL,
  `event_income` double NOT NULL,
  `store_outcome` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `staff_id` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `arrival_time` time NOT NULL,
  `leaving_time` time NOT NULL,
  `work_shift` varchar(20) NOT NULL,
  `work_hours` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fName` varchar(100) NOT NULL,
  `lName` varchar(100) NOT NULL,
  `nic` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `tel` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `daily_storage`
--

CREATE TABLE `daily_storage` (
  `date` date NOT NULL,
  `rest_orderbill` double NOT NULL,
  `hotel_orderbill` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `desserts`
--

CREATE TABLE `desserts` (
  `des_id` int(11) NOT NULL,
  `des_name` varchar(30) NOT NULL,
  `des_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `drinks`
--

CREATE TABLE `drinks` (
  `did` int(11) NOT NULL,
  `d_name` varchar(20) NOT NULL,
  `d_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `functions`
--

CREATE TABLE `functions` (
  `f_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `t_weldrink` time NOT NULL,
  `t_evedrink` time NOT NULL,
  `lunch_time` time NOT NULL,
  `payment` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `halls`
--

CREATE TABLE `halls` (
  `hall_name` varchar(20) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `hall_reservation`
--

CREATE TABLE `hall_reservation` (
  `h_rid` int(11) NOT NULL,
  `h_cname` varchar(30) NOT NULL,
  `h_phone` varchar(20) NOT NULL,
  `h_nic` varchar(20) NOT NULL,
  `h_address` varchar(50) NOT NULL,
  `h_crowd` int(11) NOT NULL,
  `h_menu` varchar(20) NOT NULL,
  `h_type` varchar(20) NOT NULL,
  `h_bookingdate` date NOT NULL,
  `h_functiondate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_orders`
--

CREATE TABLE `hotel_orders` (
  `ho_id` int(11) NOT NULL,
  `item_name` varchar(20) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL,
  `menu_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_bill`
--

CREATE TABLE `restaurant_bill` (
  `date` date NOT NULL,
  `total_bill` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_orders`
--

CREATE TABLE `restaurant_orders` (
  `o_id` int(11) NOT NULL,
  `item_name` varchar(20) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `restuarant`
--

CREATE TABLE `restuarant` (
  `ritem_id` int(11) NOT NULL,
  `ritem_name` varchar(20) NOT NULL,
  `ritem_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_no` int(11) NOT NULL,
  `room_type` varchar(20) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_no`, `room_type`, `price`) VALUES
(1245, '1', 2500),
(1246, '2', 4500);

-- --------------------------------------------------------

--
-- Table structure for table `room_customer`
--

CREATE TABLE `room_customer` (
  `r_custid` int(11) NOT NULL,
  `r_bookingid` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `nic` varchar(15) NOT NULL,
  `cust_type` int(11) NOT NULL,
  `room_no` int(11) NOT NULL,
  `serveice_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `room_reservation`
--

CREATE TABLE `room_reservation` (
  `r_rid` int(11) NOT NULL,
  `r_cname` varchar(30) NOT NULL,
  `r_phone` varchar(20) NOT NULL,
  `r_nic` varchar(20) NOT NULL,
  `r_address` varchar(50) NOT NULL,
  `r_bookingdate` date NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `no_singleroom` int(11) NOT NULL,
  `no_doubleroom` int(11) NOT NULL,
  `no_trippleroom` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_reservation`
--

INSERT INTO `room_reservation` (`r_rid`, `r_cname`, `r_phone`, `r_nic`, `r_address`, `r_bookingdate`, `check_in`, `check_out`, `no_singleroom`, `no_doubleroom`, `no_trippleroom`) VALUES
(16, 'Sam premarathna Dylan', '0710000000', '987654321v', 'P.O. Box 200, 7063 Enim Av.', '2019-09-23', '2019-09-01', '2019-09-30', 1, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `mname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `department` varchar(30) NOT NULL,
  `designation` varchar(30) NOT NULL,
  `dob` date NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `emp_date` date NOT NULL,
  `basic_salary` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `staff_salary`
--

CREATE TABLE `staff_salary` (
  `salary_id` int(11) NOT NULL,
  `staff_id` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `ot_rate` int(11) NOT NULL,
  `etf_rate` int(11) NOT NULL,
  `servicce_charge` double NOT NULL,
  `advance` double NOT NULL,
  `net_pay` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `s_id` int(11) NOT NULL,
  `s_name` varchar(100) NOT NULL,
  `s_company` varchar(50) NOT NULL,
  `s_phone` varchar(10) NOT NULL,
  `s_email` varchar(100) NOT NULL,
  `s_comaddress` varchar(50) NOT NULL,
  `s_comphone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `v_no` varchar(20) NOT NULL,
  `v_type` varchar(20) NOT NULL,
  `v_brand` varchar(20) NOT NULL,
  `driver_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `weddings`
--

CREATE TABLE `weddings` (
  `w_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `poruwa_time` time NOT NULL,
  `t_weldrink` time NOT NULL,
  `t_evedrink` time NOT NULL,
  `lunch_time` time NOT NULL,
  `discount` double NOT NULL,
  `rest_payment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wedding_menu`
--

CREATE TABLE `wedding_menu` (
  `w_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `evedrink_id` int(11) NOT NULL,
  `weldrink_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `dessert_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`staff_id`,`date`),
  ADD KEY `staff_id_fk` (`staff_id`,`date`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily_storage`
--
ALTER TABLE `daily_storage`
  ADD PRIMARY KEY (`date`);

--
-- Indexes for table `desserts`
--
ALTER TABLE `desserts`
  ADD PRIMARY KEY (`des_id`);

--
-- Indexes for table `drinks`
--
ALTER TABLE `drinks`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`f_id`),
  ADD KEY `booking` (`booking_id`);

--
-- Indexes for table `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`hall_name`);

--
-- Indexes for table `hall_reservation`
--
ALTER TABLE `hall_reservation`
  ADD PRIMARY KEY (`h_rid`);

--
-- Indexes for table `hotel_orders`
--
ALTER TABLE `hotel_orders`
  ADD KEY `hotel` (`ho_id`,`item_name`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `restaurant_bill`
--
ALTER TABLE `restaurant_bill`
  ADD PRIMARY KEY (`date`);

--
-- Indexes for table `restaurant_orders`
--
ALTER TABLE `restaurant_orders`
  ADD KEY `order` (`o_id`,`item_name`);

--
-- Indexes for table `restuarant`
--
ALTER TABLE `restuarant`
  ADD PRIMARY KEY (`ritem_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_no`);

--
-- Indexes for table `room_customer`
--
ALTER TABLE `room_customer`
  ADD PRIMARY KEY (`r_custid`),
  ADD KEY `r_bookingid` (`r_bookingid`);

--
-- Indexes for table `room_reservation`
--
ALTER TABLE `room_reservation`
  ADD PRIMARY KEY (`r_rid`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `staff_salary`
--
ALTER TABLE `staff_salary`
  ADD PRIMARY KEY (`salary_id`,`staff_id`),
  ADD KEY `staffsalary` (`salary_id`,`staff_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`v_no`),
  ADD KEY `driver` (`driver_id`);

--
-- Indexes for table `weddings`
--
ALTER TABLE `weddings`
  ADD PRIMARY KEY (`w_id`),
  ADD KEY `booking` (`booking_id`);

--
-- Indexes for table `wedding_menu`
--
ALTER TABLE `wedding_menu`
  ADD PRIMARY KEY (`w_id`,`booking_id`),
  ADD KEY `wed` (`w_id`,`booking_id`),
  ADD KEY `evedrink` (`evedrink_id`),
  ADD KEY `weldrink` (`weldrink_id`),
  ADD KEY `menu` (`menu_id`),
  ADD KEY `extradessert` (`dessert_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `desserts`
--
ALTER TABLE `desserts`
  MODIFY `des_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drinks`
--
ALTER TABLE `drinks`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hall_reservation`
--
ALTER TABLE `hall_reservation`
  MODIFY `h_rid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restuarant`
--
ALTER TABLE `restuarant`
  MODIFY `ritem_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_customer`
--
ALTER TABLE `room_customer`
  MODIFY `r_custid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_reservation`
--
ALTER TABLE `room_reservation`
  MODIFY `r_rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `weddings`
--
ALTER TABLE `weddings`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;

--
-- Constraints for table `room_customer`
--
ALTER TABLE `room_customer`
  ADD CONSTRAINT `room_customer_ibfk_1` FOREIGN KEY (`r_bookingid`) REFERENCES `room_reservation` (`r_rid`);

--
-- Constraints for table `staff_salary`
--
ALTER TABLE `staff_salary`
  ADD CONSTRAINT `staff_salary_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `staff_salary_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `vehicles_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;

--
-- Constraints for table `weddings`
--
ALTER TABLE `weddings`
  ADD CONSTRAINT `weddings_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `hall_reservation` (`h_rid`),
  ADD CONSTRAINT `weddings_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `hall_reservation` (`h_rid`) ON UPDATE CASCADE;

--
-- Constraints for table `wedding_menu`
--
ALTER TABLE `wedding_menu`
  ADD CONSTRAINT `wedding_menu_ibfk_1` FOREIGN KEY (`evedrink_id`) REFERENCES `drinks` (`did`) ON UPDATE CASCADE,
  ADD CONSTRAINT `wedding_menu_ibfk_2` FOREIGN KEY (`weldrink_id`) REFERENCES `drinks` (`did`) ON UPDATE CASCADE,
  ADD CONSTRAINT `wedding_menu_ibfk_3` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `wedding_menu_ibfk_4` FOREIGN KEY (`dessert_id`) REFERENCES `desserts` (`des_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
