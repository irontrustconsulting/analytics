from typing import List
from pydantic import BaseModel


class TopQname(BaseModel):
    qname: str
    query_count: int


class RcodeCount(BaseModel):
    rcode: int
    count: int


class QtypeCount(BaseModel):
    qtype: int
    count: int


class HistogramBin(BaseModel):
    bin: str
    count: int

class TopDomain(BaseModel):
    root_domain: str
    query_count: int



class AnalyticsGoldRecord(BaseModel):
    # identity
    tenant_id: str
    event_date: str

    # totals
    total_queries: int
    unique_qnames: int
    unique_root_domains: int
    unique_subdomains: int
    unique_src_ips: int

    # entropy + structure stats
    avg_qname_entropy: float
    max_qname_entropy: float
    avg_subdomain_entropy: float
    max_subdomain_entropy: float
    avg_subdomain_count: float
    max_subdomain_count: int

    # breakdowns
    top_qnames: List[TopQname]   # <— uncommented / added
    rcode_breakdown: List[RcodeCount]
    qtype_breakdown: List[QtypeCount]
    top_root_domains: List[TopDomain]

    # histograms
    qname_entropy_histogram: List[HistogramBin]
    subdomain_entropy_histogram: List[HistogramBin]

