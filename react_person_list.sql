-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2022 at 07:49 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactperson`
--

-- --------------------------------------------------------

--
-- Table structure for table `react_person_list`
--

CREATE TABLE `react_person_list` (
  `react_person_list_id` int(11) NOT NULL,
  `react_person_list_fname` varchar(256) NOT NULL,
  `react_person_list_lname` varchar(256) NOT NULL,
  `react_person_list_bday` date NOT NULL,
  `react_person_list_gender` varchar(32) NOT NULL,
  `react_person_list_status` varchar(64) NOT NULL,
  `react_person_list_date_added` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `react_person_list`
--

INSERT INTO `react_person_list` (`react_person_list_id`, `react_person_list_fname`, `react_person_list_lname`, `react_person_list_bday`, `react_person_list_gender`, `react_person_list_status`, `react_person_list_date_added`) VALUES
(1, 'john', 'smith', '1970-01-01', 'male', 'divorced', '2022-10-16 13:32:11'),
(2, 'Charlene', 'Herrera', '1966-01-30', 'female', 'single', '2022-10-16 13:42:07'),
(3, 'Anita', 'Gonzalez', '1995-11-22', 'female', 'deceased', '2022-10-16 13:44:19'),
(4, 'Clarence', 'Rose', '1944-09-28', 'male', 'single', '2022-10-16 13:44:46'),
(5, 'Roberto', 'Ferguson', '1957-05-24', 'male', 'deceased', '2022-10-16 13:44:51'),
(6, 'Regina', 'Marshall', '1990-03-15', 'female', 'married', '2022-10-16 13:44:53'),
(7, 'Judith', 'Shelton', '1973-11-24', 'female', 'widowed', '2022-10-16 13:44:57'),
(8, 'Catherine', 'Richardson', '1997-09-08', 'female', 'divorced', '2022-10-16 13:44:59'),
(9, 'Carol', 'Shaw', '1977-10-22', 'female', 'single', '2022-10-16 13:45:01'),
(10, 'Dale', 'Gilbert', '1944-12-08', 'male', 'deceased', '2022-10-16 13:45:03'),
(11, 'Sheila', 'Reed', '1972-05-08', 'female', 'deceased', '2022-10-16 13:45:04'),
(12, 'Bonnie', 'Holt', '1973-12-08', 'female', 'married', '2022-10-16 13:45:06'),
(13, 'Alice', 'Butler', '1996-04-14', 'female', 'divorced', '2022-10-16 13:45:08'),
(14, 'Dustin', 'Wheeler', '1973-07-20', 'male', 'deceased', '2022-10-16 13:45:10'),
(15, 'Andy', 'Ferguson', '1995-12-20', 'male', 'divorced', '2022-10-16 13:45:12'),
(16, 'Logan', 'Kuhn', '1945-07-07', 'male', 'widowed', '2022-10-16 13:45:13'),
(17, 'Tim', 'Hicks', '1980-03-03', 'male', 'deceased', '2022-10-16 13:45:15'),
(18, 'Ana', 'Porter', '1951-01-05', 'female', 'divorced', '2022-10-16 13:45:17'),
(19, 'Caroline', 'Peterson', '1997-06-25', 'female', 'widowed', '2022-10-16 13:45:18'),
(20, 'Timothy', 'Crawford', '1967-04-23', 'male', 'deceased', '2022-10-16 13:45:20'),
(21, 'Lisa', 'Ortiz', '1992-04-22', 'female', 'deceased', '2022-10-16 13:45:22'),
(22, 'Brandy', 'Simmons', '1987-01-13', 'female', 'deceased', '2022-10-16 13:45:23'),
(23, 'Julio', 'Gardner', '2001-04-27', 'male', 'widowed', '2022-10-16 13:45:25'),
(24, 'Robin', 'Stephens', '1957-07-13', 'female', 'deceased', '2022-10-16 13:45:26'),
(25, 'Erika', 'Franklin', '1957-06-02', 'female', 'single', '2022-10-16 13:45:28'),
(26, 'Erik', 'Hunt', '1990-12-04', 'male', 'single', '2022-10-16 13:45:30'),
(27, 'June', 'Romero', '1995-09-16', 'female', 'widowed', '2022-10-16 13:45:31'),
(28, 'Byron', 'Ray', '1980-06-27', 'male', 'married', '2022-10-16 13:45:32'),
(29, 'Hector', 'Ray', '1973-05-04', 'male', 'widowed', '2022-10-16 13:45:34'),
(30, 'Ramon', 'White', '1991-10-23', 'male', 'single', '2022-10-16 13:45:36'),
(31, 'Nora', 'Johnson', '1989-09-10', 'female', 'deceased', '2022-10-16 13:45:37'),
(32, 'Phyllis', 'Chavez', '1946-05-13', 'female', 'deceased', '2022-10-16 13:45:39'),
(33, 'Evan', 'Brooks', '1970-10-20', 'male', 'married', '2022-10-16 13:45:40'),
(34, 'Gail', 'Rice', '1959-08-15', 'female', 'deceased', '2022-10-16 13:45:41'),
(35, 'Stella', 'Hale', '1955-07-30', 'female', 'single', '2022-10-16 13:45:43'),
(36, 'Taylor', 'Ross', '1973-10-17', 'female', 'divorced', '2022-10-16 13:45:44'),
(37, 'Jon', 'Franklin', '1971-02-11', 'male', 'divorced', '2022-10-16 13:45:45'),
(38, 'Jar', 'Anderson', '1957-07-10', 'male', 'single', '2022-10-16 13:45:47'),
(39, 'Earl', 'Phillips', '1956-04-29', 'male', 'deceased', '2022-10-16 13:45:48'),
(40, 'Maxine', 'Barnett', '1949-06-05', 'female', 'divorced', '2022-10-16 13:45:50'),
(41, 'Lesa', 'Thompson', '1999-02-24', 'female', 'divorced', '2022-10-16 13:45:51'),
(42, 'Colleen', 'May', '2000-07-19', 'female', 'single', '2022-10-16 13:45:53'),
(43, 'Bella', 'May', '1957-08-16', 'female', 'married', '2022-10-16 13:45:57'),
(44, 'Lisa', 'Fuller', '1989-02-04', 'female', 'deceased', '2022-10-16 13:45:59'),
(45, 'Elizabeth', 'Fowler', '1981-02-10', 'female', 'widowed', '2022-10-16 13:46:02'),
(46, 'Kay', 'Brown', '1966-07-11', 'female', 'married', '2022-10-16 13:46:03'),
(47, 'Same', 'Chavez', '1988-11-28', 'male', 'deceased', '2022-10-16 13:46:05'),
(48, 'Lester', 'West', '1968-03-25', 'male', 'widowed', '2022-10-16 13:46:07'),
(49, 'Samantha', 'Webb', '1952-11-10', 'female', 'married', '2022-10-16 13:46:08'),
(50, 'Arnold', 'Tucker', '1951-11-05', 'male', 'widowed', '2022-10-16 13:46:10'),
(51, 'Shannon', 'Kelley', '1966-02-24', 'female', 'deceased', '2022-10-16 13:46:12'),
(52, 'Tristan', 'Simmmons', '1962-09-30', 'male', 'married', '2022-10-16 13:46:14'),
(53, 'Bobby', 'Williams', '1985-08-09', 'male', 'divorced', '2022-10-16 13:46:16'),
(54, 'Ian', 'Richards', '1985-10-06', 'male', 'deceased', '2022-10-16 13:46:17'),
(55, 'Matthew', 'Nguyen', '1970-10-04', 'male', 'single', '2022-10-16 13:46:19'),
(56, 'Antonio', 'Reyes', '1969-02-21', 'male', 'divorced', '2022-10-16 13:46:20'),
(57, 'Matthew', 'Phillips', '1953-10-07', 'male', 'married', '2022-10-16 13:46:21'),
(58, 'Owen', 'Henry', '1969-10-04', 'male', 'single', '2022-10-16 13:46:23'),
(59, 'Erika', 'Day', '1998-04-24', 'female', 'widowed', '2022-10-16 13:46:25'),
(60, 'Chris', 'Jensen', '1981-11-07', 'male', 'widowed', '2022-10-16 13:46:26'),
(61, 'Warren', 'Dixon', '1975-05-07', 'male', 'deceased', '2022-10-16 13:46:27'),
(62, 'Rene', 'Holt', '1950-04-15', 'male', 'divorced', '2022-10-16 13:46:29'),
(63, 'Charlotte', 'Campbell', '1988-02-19', 'female', 'divorced', '2022-10-16 13:46:30'),
(64, 'Tracy', 'Mills', '1997-09-05', 'female', 'single', '2022-10-16 13:46:32'),
(65, 'Lucy', 'Matthews', '1946-01-04', 'female', 'married', '2022-10-16 13:46:33'),
(66, 'Joe', 'Evans', '1953-10-06', 'male', 'deceased', '2022-10-16 13:46:35'),
(67, 'Johnni', 'Fuller', '1956-12-26', 'male', 'deceased', '2022-10-16 13:46:36'),
(68, 'Nellie', 'Williams', '1992-12-11', 'female', 'divorced', '2022-10-16 13:46:37'),
(69, 'Sheryl', 'Moore', '1978-05-14', 'female', 'single', '2022-10-16 13:46:39'),
(70, 'Bobby', 'Boyd', '1959-09-09', 'male', 'widowed', '2022-10-16 13:46:40'),
(71, 'Francisco', 'Foster', '1976-10-09', 'male', 'married', '2022-10-16 13:46:42'),
(72, 'Britney', 'Reed', '1971-07-05', 'female', 'divorced', '2022-10-16 13:46:43'),
(73, 'Louis', 'Williams', '1946-11-18', 'male', 'married', '2022-10-16 13:46:44'),
(74, 'Cathy', 'Cook', '1983-03-24', 'female', 'single', '2022-10-16 13:46:46'),
(75, 'Kelly', 'Stevens', '1969-07-03', 'female', 'divorced', '2022-10-16 13:46:47'),
(76, 'Joel', 'Gomez', '1980-01-17', 'male', 'deceased', '2022-10-16 13:46:49'),
(77, 'Anita', 'Payne', '1993-07-10', 'female', 'divorced', '2022-10-16 13:46:50'),
(78, 'Sophia', 'Garrett', '1982-06-22', 'female', 'divorced', '2022-10-16 13:46:51'),
(79, 'Leah', 'Moore', '1976-02-14', 'female', 'deceased', '2022-10-16 13:46:53'),
(80, 'Susie ', 'Simmons', '1971-02-13', 'female', 'widowed', '2022-10-16 13:46:55'),
(81, 'Savannah', 'Rice', '1965-02-17', 'female', 'single', '2022-10-16 13:46:56'),
(82, 'Bertha', 'Hale', '1948-10-19', 'female', 'married', '2022-10-16 13:46:57'),
(83, 'Kaylee', 'Rogers', '1988-11-24', 'female', 'married', '2022-10-16 13:46:59'),
(84, 'Aubree', 'Perry', '1982-05-28', 'female', 'divorced', '2022-10-17 02:12:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `react_person_list`
--
ALTER TABLE `react_person_list`
  ADD PRIMARY KEY (`react_person_list_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `react_person_list`
--
ALTER TABLE `react_person_list`
  MODIFY `react_person_list_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
