import React from 'react';
import Card from '../../../components/common/Card';

const InsightList = ({ title, items, renderItem, emptyText = 'No data available.' }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {items && items.length > 0 ? (
        <ul className="space-y-3">
          {items.map(renderItem)}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">{emptyText}</p>
      )}
    </Card>
  );
};

export default InsightList;
