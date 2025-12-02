import { ExportTemplate } from '../../types';
import './TemplateSelector.css';

interface TemplateSelectorProps {
  templates: ExportTemplate[];
  selectedTemplateId: string | null;
  onTemplateSelect: (template: ExportTemplate | null) => void;
}

export default function TemplateSelector({ 
  templates, 
  selectedTemplateId, 
  onTemplateSelect 
}: TemplateSelectorProps) {
  return (
    <div className="template-selector">
      <h3 className="section-title">Pre-configured Templates</h3>
      <div className="template-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplateId === template.id ? 'template-card--selected' : ''}`}
            onClick={() => onTemplateSelect(
              selectedTemplateId === template.id ? null : template
            )}
          >
            <div className="template-header">
              <h4 className="template-name">{template.name}</h4>
              <span className={`template-badge template-badge--${template.clientType}`}>
                {template.clientType}
              </span>
            </div>
            <p className="template-description">{template.description}</p>
            <div className="template-details">
              <span className="template-detail">Type: {template.exportType}</span>
              <span className="template-detail">Columns: {template.selectedColumns.length}</span>
            </div>
          </div>
        ))}
      </div>
      {selectedTemplateId && (
        <button 
          className="template-clear-btn"
          onClick={() => onTemplateSelect(null)}
        >
          Clear Template Selection
        </button>
      )}
    </div>
  );
}

