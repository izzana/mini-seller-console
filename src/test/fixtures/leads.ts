import type { Lead } from "../../types";


export const leadsFixture: Lead[] = [
  { id:'1', name:'Alice', company:'Innovate', email:'alice@innovate.com', source:'Web', score:90, status:'New' },
  { id:'2', name:'Bob', company:'Global',   email:'bob@global.com',       source:'Referral', score:80, status:'Qualified' },
  { id:'3', name:'Carol', company:'Green',  email:'carol@green.com',      source:'Email',    score:70, status:'Contacted' },
]
