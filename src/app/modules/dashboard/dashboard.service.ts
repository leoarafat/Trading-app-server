import { generateLastMonthsData } from '../../../utils/analytics.generator';
import User from '../auth/auth.model';

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
const Analytics = async () => {
  //! User
  const monthlyUserGrowth = await generateLastMonthsData(User, 1);

  //! Income
  const monthlyIncomeGrowth = await generateLastMonthsData(User, 1);
  return {
    monthlyUserGrowth,
    monthlyIncomeGrowth,
  };
};
export const DashboardService = {
  totalCount,
  Analytics,
};
