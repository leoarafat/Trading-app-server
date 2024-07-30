import { logger } from '../../../shared/logger';
import User from '../auth/auth.model';
import { Subscription } from '../subscriptions/subscriptions.model';
const getYearRange = (year: any) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);
  return { startDate, endDate };
};
const totalCount = async () => {
  const totalUser = await User.countDocuments({ role: 'USER' });
  const totalIncome = 1000;
  const goldUsers = await User.countDocuments({ userType: 'Gold' });
  const platinumUsers = await User.countDocuments({ userType: 'Platinum' });
  const diamondUsers = await User.countDocuments({ userType: 'Diamond' });

  return {
    totalUser,
    totalIncome,
    goldUsers,
    platinumUsers,
    diamondUsers,
  };
};
const getMonthlySubscriptionGrowth = async (year?: number) => {
  try {
    const currentYear = new Date().getFullYear();
    const selectedYear = year || currentYear;

    const { startDate, endDate } = getYearRange(selectedYear);

    const monthlySubscriptionGrowth = await Subscription.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          year: '$_id.year',
          count: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = monthlySubscriptionGrowth.find(
        data => data.month === i,
      ) || { month: i, count: 0, year: selectedYear };
      result.push({
        ...monthData,
        month: months[i - 1],
      });
    }

    return {
      year: selectedYear,
      data: result,
    };
  } catch (error) {
    logger.error('Error in getMonthlySubscriptionGrowth function: ', error);
    throw error;
  }
};

const getMonthlyUserGrowth = async (year?: number) => {
  try {
    const currentYear = new Date().getFullYear();
    const selectedYear = year || currentYear;

    const { startDate, endDate } = getYearRange(selectedYear);

    const monthlyUserGrowth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
          role: 'USER',
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          year: '$_id.year',
          count: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = monthlyUserGrowth.find(data => data.month === i) || {
        month: i,
        count: 0,
        year: selectedYear,
      };
      result.push({
        ...monthData,
        month: months[i - 1],
      });
    }

    return {
      year: selectedYear,
      data: result,
    };
  } catch (error) {
    logger.error('Error in getMonthlyUserGrowth function: ', error);
    throw error;
  }
};
const approveUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User not found with id ${userId}`);
    }
    user.isApproved = true;
    await user.save();
    return user;
  } catch (error) {
    logger.error('Error in approveUser function: ', error);
    throw error;
  }
};

const rejectUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User not found with id ${userId}`);
    }
    user.isApproved = false;
    await user.save();
    return user;
  } catch (error) {
    logger.error('Error in rejectUser function: ', error);
    throw error;
  }
};
export const DashboardService = {
  totalCount,
  getMonthlySubscriptionGrowth,
  getMonthlyUserGrowth,
  approveUser,
  rejectUser,
};
