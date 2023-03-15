import { i18n } from 'src/boot/i18n';

const { t } = i18n.global;

const createTasksOptionsIds = {
  TODAY: "today",
  TOMORROW: "tomorrow",
  NEXT_WEEK: "next-week",
  PICK_A_DATE: "pick-a-date",
  LATER_TODAY: "later-today",
  TOMORROW: "tomorrow",
  NEXT_WEEK: "next-week",
  PICK_A_DATE_AND_TIME: "pick-a-date-and-time",
  DAILY: "daily",
  WEEKDAYS: "weekdays",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
  CUSTOM: "custom",
}

const dueDateOptions = [
  {
    id: createTasksOptionsIds.TODAY,
    icon: 'mdi-calendar-today',
    name: t("TODAY"),
  },
  {
    id: createTasksOptionsIds.TOMORROW,
    icon: 'mdi-calendar-arrow-right',
    name: t("TOMORROW"),
  },
  {
    id: createTasksOptionsIds.NEXT_WEEK,
    icon: 'mdi-calendar-week',
    name: t("NEXT_WEEK"),
  },
  {
    id: createTasksOptionsIds.PICK_A_DATE,
    icon: 'mdi-calendar-cursor',
    name: t("PICK_A_DATE"),
    dialog: {
      value: null
    },
  },
];

const remindMeOptions = [
  {
    id: createTasksOptionsIds.LATER_TODAY,
    icon: 'mdi-update',
    name: t("LATER_TODAY"),
  },
  {
    id: createTasksOptionsIds.TOMORROW,
    icon: 'mdi-clock-outline',
    name: t("TOMORROW"),
  },
  {
    id: createTasksOptionsIds.NEXT_WEEK,
    icon: 'mdi-clock-start',
    name: t("NEXT_WEEK"),
  },
  {
    id: createTasksOptionsIds.PICK_A_DATE_AND_TIME,
    icon: 'mdi-calendar-clock',
    name: t("PICK_A_DATE_AND_TIME"),
    dialog: {
      value: null
    },
  },
];

const repeatOptions = [
  {
    id: createTasksOptionsIds.DAILY,
    icon: 'mdi-repeat',
    name: t("DAILY"),
  },
  {
    id: createTasksOptionsIds.WEEKDAYS,
    icon: 'mdi-repeat',
    name: t("WEEKDAYS"),
  },
  {
    id: createTasksOptionsIds.WEEKLY,
    icon: 'mdi-repeat-once',
    name: t("WEEKLY"),
  },
  {
    id: createTasksOptionsIds.MONTHLY,
    icon: 'mdi-calendar-refresh',
    name: t("MONTHLY"),
  },
  {
    id: createTasksOptionsIds.YEARLY,
    icon: 'mdi-star-shooting-outline',
    name: t("YEARLY"),
  },
  {
    id: createTasksOptionsIds.CUSTOM,
    icon: 'mdi-pencil-circle-outline',
    name: t("CUSTOM"),
    dialog: {
      value: null
    },
  },
];

export {
  createTasksOptionsIds,
  dueDateOptions,
  remindMeOptions,
  repeatOptions,
}