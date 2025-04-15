# React Cron Schedule Knowledge Transfer Documentation

## Overview
This is a React component library that provides a user-friendly interface for creating and managing cron expressions. It's built on top of the `cron-schedule-parser` npm package and offers a more intuitive way to work with cron schedules in React applications.

## Core Components

### Main Component: `Recurrence`
The primary component that provides the cron expression interface. It offers two main scheduling modes:
1. Weekly Scheduling
2. Monthly Scheduling

## Key Features

### 1. Weekly Scheduling
- Set recurrence frequency (weekly)
- Select specific weekdays
- Configure start and end dates
- Set end conditions (no end, specific date, or occurrence count)

### 2. Monthly Scheduling
- Choose specific days of the month (1-31)
- Select specific weekdays
- Configure monthly frequency
- Set start and end conditions

## Component Props

### Main Props
```typescript
interface RecurrenceProps {
  value?: {
    startDate?: Date | string;
    endDate?: Date | string;
    repeat?: 'weekly' | 'monthly';
    frequency?: number;
    selectedEndType?: 'noend' | 'date' | 'count';
    endCount?: number;
    cronExpression?: string[];
    showOnlyBottomBorder?: boolean;
    repeatFor?: number;
    repeatForType?: 'days' | 'workingDays' | 'weeks';
    isFullWeek?: boolean;
    skipFrom?: number;
    skipTo?: number;
  };
  disabled?: boolean;
  showCronExpression?: boolean;
  onChange?: (value: any) => void;
  styles?: {
    [key: string]: React.CSSProperties;
  };
}
```

## Styling System
The component uses a comprehensive styling system that allows customization of all UI elements. Key style classes include:
- `root`: Root element styles
- `frequencyContainer`: Frequency row styles
- `weekContainer`: Week selection row styles
- `monthContainer`: Month selection row styles
- `dateContainer`: Date selection row styles
- And many more specific component styles

## Development Setup

### Prerequisites
- Node.js and npm installed
- Git access to the repository

### Setup Steps
1. Clone the repository
2. Run `npm install` to install dependencies
3. Start Storybook for development: `npm run storybook`

## Build and Publishing Process

### Version Management
1. Commit all changes before versioning:
```bash
git add .
git commit -m 'Your commit message'
```

2. Build the library:
```bash
npm run build-lib
```

3. Version the package:
```bash
npm version patch
npm --no-git-tag-version version patch
```

4. Publish to npm:
```bash
npm publish
```

## Important Notes for Maintainers

1. **Versioning**
   - Use semantic versioning (major.minor.patch)
   - Always run `npm run build-lib` before versioning
   - Use `--no-git-tag-version` to prevent automatic git tagging

2. **Testing**
   - Test both weekly and monthly scheduling scenarios
   - Verify all edge cases for date ranges
   - Test different cron expression inputs

3. **Common Issues**
   - Cron expression validation
   - Date range validation
   - Weekday selection conflicts
   - Monthly day selection conflicts

4. **Performance Considerations**
   - The component is optimized for both desktop and mobile views
   - Uses virtualized lists for better performance with large selections
   - Follows React best practices for state management

## Security Considerations
- Input validation for all date fields
- Sanitization of cron expressions
- Proper error handling for invalid inputs

## Troubleshooting Common Issues

### Cron Expression Validation
- Ensure all cron expressions follow standard format
- Validate frequency values against selected repeat type
- Check for valid date ranges

### Date Range Issues
- Start date must be before end date
- Validate date formats
- Handle timezone differences appropriately

### Styling Issues
- Use the provided style classes consistently
- Test styling changes across different screen sizes
- Ensure accessibility compliance

This documentation serves as a comprehensive knowledge transfer guide for maintaining and extending the React Cron Schedule component. The component is well-structured and follows React best practices, making it maintainable and extensible for future development.
