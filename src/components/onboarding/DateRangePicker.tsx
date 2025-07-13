import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, X, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { DateRange } from '../../types';
import { formatDateRange, isValidDateRange, getMinDate, getMaxDate } from '../../utils/dateUtils';

interface DateRangePickerProps {
  selectedDates: DateRange[];
  onDateChange: (dates: DateRange[]) => void;
  maxSelections?: number;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDates,
  onDateChange,
  maxSelections = 5,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRange, setNewRange] = useState<Partial<DateRange>>({
    isFlexible: false,
  });

  const minDate = getMinDate().toISOString().split('T')[0];
  const maxDate = getMaxDate().toISOString().split('T')[0];

  const handleAddRange = () => {
    if (newRange.startDate && newRange.endDate) {
      const startDate = new Date(newRange.startDate);
      const endDate = new Date(newRange.endDate);
      
      if (!isValidDateRange(startDate, endDate)) {
        alert('End date must be after start date');
        return;
      }

      const dateRange: DateRange = {
        startDate,
        endDate,
        destination: newRange.destination || '',
        isFlexible: newRange.isFlexible || false,
      };

      onDateChange([...selectedDates, dateRange]);
      setNewRange({ isFlexible: false });
      setIsAddingNew(false);
    }
  };

  const handleRemoveRange = (index: number) => {
    const updatedDates = selectedDates.filter((_, i) => i !== index);
    onDateChange(updatedDates);
  };

  const canAddMore = selectedDates.length < maxSelections;

  return (
    <div className="space-y-6">
      {/* Selected Date Ranges */}
      <AnimatePresence>
        {selectedDates.map((dateRange, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="glass" className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {formatDateRange(dateRange.startDate, dateRange.endDate)}
                    </h3>
                    {dateRange.destination && (
                      <div className="flex items-center text-white/80 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{dateRange.destination}</span>
                      </div>
                    )}
                    {dateRange.isFlexible && (
                      <span className="inline-block bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full mt-2">
                        Flexible dates
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRange(index)}
                  className="text-white/60 hover:text-red-400 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add New Date Range */}
      <AnimatePresence>
        {isAddingNew ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="glass">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Add Travel Dates
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      max={maxDate}
                      value={newRange.startDate || ''}
                      onChange={(e) => setNewRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      min={newRange.startDate || minDate}
                      max={maxDate}
                      value={newRange.endDate || ''}
                      onChange={(e) => setNewRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Destination (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bali, Thailand, Europe"
                    value={newRange.destination || ''}
                    onChange={(e) => setNewRange(prev => ({ ...prev, destination: e.target.value }))}
                    className="input-field"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="flexible"
                    checked={newRange.isFlexible || false}
                    onChange={(e) => setNewRange(prev => ({ ...prev, isFlexible: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 bg-white/20 border-white/30 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <label htmlFor="flexible" className="ml-2 text-white/80 text-sm">
                    I'm flexible with these dates (±3 days)
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewRange({ isFlexible: false });
                    }}
                    className="text-white/80 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddRange}
                    disabled={!newRange.startDate || !newRange.endDate}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500"
                  >
                    Add Dates
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          canAddMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="secondary"
                onClick={() => setIsAddingNew(true)}
                className="w-full py-4 border-2 border-dashed border-white/30 hover:border-white/50 hover:bg-white/10"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Travel Dates
              </Button>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Info */}
      <div className="text-center text-white/60 text-sm">
        {selectedDates.length > 0 && (
          <p>
            {selectedDates.length} of {maxSelections} date ranges selected
          </p>
        )}
        {selectedDates.length === 0 && (
          <p>
            Add your travel dates to find compatible travel companions
          </p>
        )}
      </div>
    </div>
  );
};
