import cron from 'node-cron';
import { logger } from '../../../shared/logger';
import { Plan } from './upgrade-plan.model';
import User from '../auth/auth.model';

cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    await Plan.updateMany(
      { endDate: { $lt: now }, status: 'active' },
      { $set: { status: 'inactive' } },
      { new: true, multi: true },
    );

    const expiredSubscriptions = await Plan.find(
      { endDate: { $lt: now }, status: 'inactive' },
      { user_id: 1 },
    ).lean();
    const userIds = expiredSubscriptions.map(sub => sub.user_id);

    await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isSubscribed: false } },
    );
    logger.info('Subscription statuses updated successfully');
  } catch (error) {
    logger.error('Error updating subscription statuses:', error);
  }
});
