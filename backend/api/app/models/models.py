# api/models.py
from pydantic import BaseModel
from typing import List, Dict

class TemplateMetaData(BaseModel):
    id: str
    name: str
    description: str
    version: float
    category: str

class QueryTemplate(BaseModel):
    sql: str
    metadata: TemplateMetaData

class Templates(BaseModel):
    id: str
    name: str

class Histogram(BaseModel):
    bins: List[str]
    counts: List[int]


class TopItem(BaseModel):
    label: str
    count: int

class AnalyticsResponse(BaseModel):
    tenant_id: str
    event_date: str

    totals: Dict[str, int]

    qname_entropy_histogram: Histogram
    subdomain_entropy_histogram: Histogram

    top_qnames: List[TopItem]
    top_rcodes: List[TopItem]
    top_qtypes: List[TopItem]

class TemplateRegistry(BaseModel):
    registry: list[QueryTemplate]

    def get_template(self, template_id: str) -> QueryTemplate | None:
        for tpl in self.registry:
            if tpl.metadata.id == template_id:
                return tpl
        return None

    def list_templates(self) -> list[str]:
        # return [tpl.metadata.name for tpl in self.registry]
        return [Templates(id=tpl.metadata.id, name=tpl.metadata.name) for tpl in self.registry]


