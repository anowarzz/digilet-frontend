export interface TourStep {
  element: string;
  popover: {
    title: string;
    description: string;
  };
}

export interface TourConfig {
  [role: string]: TourStep[];
}

export const tourSteps: TourConfig = {
  USER: [
    {
      element: 'a[href="/user/analytics"]',
      popover: {
        title: "Overview",
        description: "Check your wallet overview and analytics here.",
      },
    },
    {
      element: 'a[href="/user/wallet"]',
      popover: {
        title: "My Wallet",
        description: "View your wallet balance and recent transactions.",
      },
    },
    {
      element: '[data-tour="balance-card"]',
      popover: {
        title: "Balance Card",
        description:
          "Here you can see your current wallet balance, transaction count, and monthly volume.",
      },
    },
    {
      element: '[data-tour="profile-button"]',
      popover: {
        title: "Profile Button",
        description:
          "Click here to access your profile settings and account information.",
      },
    },
    {
      element: '[title="Toggle Theme"]',
      popover: {
        title: "Theme Toggle",
        description:
          "Switch between light and dark themes according to your preference.",
      },
    },
  ],
  AGENT: [
    {
      element: 'a[href="/agent/analytics"]',
      popover: {
        title: "Analytics",
        description: "View your agent performance and transaction analytics.",
      },
    },
    {
      element: 'a[href="/agent/wallet"]',
      popover: {
        title: "My Wallet",
        description: "Manage your agent wallet and view balance.",
      },
    },
    {
      element: '[data-tour="balance-card"]',
      popover: {
        title: "Balance Card",
        description:
          "Monitor your agent wallet balance and transaction metrics.",
      },
    },
    {
      element: 'a[href="/agent/cash-in"]',
      popover: {
        title: "Cash In",
        description: "Help users top up their wallets with cash.",
      },
    },
    {
      element: 'a[href="/agent/cash-out"]',
      popover: {
        title: "Cash Out",
        description: "Process cash withdrawal requests for users.",
      },
    },
    {
      element: '[data-tour="profile-button"]',
      popover: {
        title: "Profile Button",
        description: "Access your agent profile and account settings.",
      },
    },
    {
      element: '[title="Toggle Theme"]',
      popover: {
        title: "Theme Toggle",
        description: "Switch between light and dark themes.",
      },
    },
  ],
  ADMIN: [
    {
      element: 'a[href="/admin/analytics"]',
      popover: {
        title: "Analytics Dashboard",
        description: "View comprehensive system analytics and reports.",
      },
    },
    {
      element: 'a[href="/admin/all-users"]',
      popover: {
        title: "User Management",
        description: "Manage all registered users in the system.",
      },
    },
    {
      element: 'a[href="/admin/all-agents"]',
      popover: {
        title: "Agent Management",
        description: "Oversee all agents and their activities.",
      },
    },
    {
      element: 'a[href="/admin/all-transactions"]',
      popover: {
        title: "Transaction Management",
        description: "Monitor all transactions across the platform.",
      },
    },
    {
      element: '[data-tour="profile-button"]',
      popover: {
        title: "Profile Button",
        description: "Access your admin profile and settings.",
      },
    },
    {
      element: '[title="Toggle Theme"]',
      popover: {
        title: "Theme Toggle",
        description: "Switch between light and dark themes.",
      },
    },
  ],
};

export const getTourSteps = (role: string): TourStep[] => {
  return tourSteps[role] || [];
};

export const getTourStorageKey = (role: string): string => {
  return `${role.toLowerCase()}TourSeen`;
};
