import { EmployeeConstants } from '../employee/employee.constants';
import { IEmployeeFilters } from '../employee/employee.interface';

type IFilterResult = {
  $and: (
    | {
        [x: string]: boolean;
      }
    | {
        [x: string]: string | number | undefined;
      }
  )[];
};
const handleEmployeeFilters = (
  employeeFilters: IEmployeeFilters,
): IFilterResult => {
  const [, SALARY, IS_ACTIVE, ROLE] = EmployeeConstants.FILTERS;
  const filtersConditionKeys = Object.keys(employeeFilters);
  return {
    $and: filtersConditionKeys.map((filterKey) => {
      let filter;
      if (filterKey === SALARY) {
        filter = {
          [`employee.${filterKey}`]: Number(employeeFilters[filterKey]),
        };
      } else if (filterKey === IS_ACTIVE) {
        filter = {
          [`employee.${filterKey}`]: Boolean(
            Number(employeeFilters[filterKey]),
          ),
        };
      } else if (filterKey === ROLE) {
        filter = { [filterKey]: Boolean(Number(employeeFilters[filterKey])) };
      } else {
        filter = { [`employee.${filterKey}`]: employeeFilters[filterKey] };
      }
      return filter;
    }),
  };
};

export const AdminUtils = { handleEmployeeFilters };
