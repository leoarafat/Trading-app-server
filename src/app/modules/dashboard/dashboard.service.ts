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

export const DashboardService = {
  totalCount,
};
