import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TimeZone } from '../types';
import { TimeZoneRow } from './TimeZoneRow';

interface TimeZoneListProps {
  timezones: TimeZone[];
  onReorder: (timezones: TimeZone[]) => void;
  onRemove: (timezone: TimeZone) => void;
  selectedTimeBlock?: { start: Date; end: Date };
}

export function TimeZoneList({
  timezones,
  onReorder,
  onRemove,
  selectedTimeBlock,
}: TimeZoneListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = timezones.findIndex((tz) => tz.id === active.id);
      const newIndex = timezones.findIndex((tz) => tz.id === over.id);
      onReorder(arrayMove(timezones, oldIndex, newIndex));
    }
  }

  return (
    <div className="w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={timezones.map((tz) => tz.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {timezones.map((timezone) => (
              <TimeZoneRow
                key={timezone.id}
                timezone={timezone}
                onRemove={() => onRemove(timezone)}
                selectedTimeBlock={selectedTimeBlock}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}