import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Calendario = () => {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const calendarDays = [];
    const blankDays = Array(firstDayOfMonth).fill(null);
  
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = day === currentDay && currentMonth === currentDate.getMonth();
      calendarDays.push(
        <View
          style={[
            styles.calendarDay,
            isCurrentDay && styles.currentDay,
            !isCurrentDay && styles.disabledDay
          ]}
          key={day}
        >
          <Text
            style={[
              styles.dayText,
              isCurrentDay && styles.currentDayText,
              !isCurrentDay && styles.disabledDayText
            ]}
          >
            {day}
          </Text>
        </View>
      );
    }
  
    return [...blankDays, ...calendarDays];
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Text style={styles.headerButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{`${currentYear} - ${
            currentMonth + 1
          }`}</Text>
          <TouchableOpacity onPress={goToNextMonth}>
            <Text style={styles.headerButton}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>
          <View style={styles.weekDayContainer}>
            <Text style={styles.weekDayText}>Sun</Text>
            <Text style={styles.weekDayText}>Mon</Text>
            <Text style={styles.weekDayText}>Tue</Text>
            <Text style={styles.weekDayText}>Wed</Text>
            <Text style={styles.weekDayText}>Thu</Text>
            <Text style={styles.weekDayText}>Fri</Text>
            <Text style={styles.weekDayText}>Sat</Text>
          </View>
          <View style={styles.calendarDaysContainer}>
            {renderCalendar()}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E7ED',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerButton: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#202124',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202124',
  },
  calendar: {
    flexDirection: 'column',
  },
  weekDayContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5f6368',
  },
  calendarDaysContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
  },
  calendarDay: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  dayText: {
    fontSize: 16,
    color: '#202124',
  },
  currentDay: {
    backgroundColor: '#A60321',
    borderRadius: 15,
    
  },
  currentDayText: {
    color: 'white',
    fontWeight: 'bold',
    
  },

  // Enfoque de la fecha actual, desenfocando las demas. 
//   disabledDay: {
//     backgroundColor: '#F0F0F0',
//   },
//   disabledDayText: {
//     color: '#BFBFBF',
//   },
});

export default Calendario;