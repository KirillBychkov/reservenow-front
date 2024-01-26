import {
  CreateTrainerDTO,
  UpdateTrainerDTO,
} from '@/models/requests/TrainerRequests';
import personnelStore from '@/store/personnelStore';
import { TrainerFormData } from '@/types/trainer';
import { finalizeWorkingHours } from '@/utils/formHelpers/formHelpers';
import { formatObjectOut } from '@/utils/formatters/formatObject';

export const createTrainer = async (data: TrainerFormData) => {
  const workingHours = finalizeWorkingHours(data.workingHours);
  const trainer: CreateTrainerDTO = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    description: data.description,
    price_per_hour: data.price,
    ...workingHours,
  };

  const formattedTrainer = formatObjectOut(trainer);

  const response = await personnelStore.createTrainer(formattedTrainer);
  return response;
};

export const updateTrainer = async (
  trainerId: number,
  data: TrainerFormData,
) => {
  const workingHours = finalizeWorkingHours(data.workingHours);
  const trainer: UpdateTrainerDTO = {
    first_name: data.firstName,
    last_name: data.lastName,
    phone: data.phone,
    description: data.description,
    price_per_hour: data.price,
    ...workingHours,
  };

  const formattedTrainer = formatObjectOut(trainer);

  const response = await personnelStore.updateTrainer(
    trainerId,
    formattedTrainer,
  );
  return response;
};
