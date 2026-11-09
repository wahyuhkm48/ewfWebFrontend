export const missions = [
  "Menyediakan layanan perdagangan berjangka yang profesional, aman, dan berintegritas tinggi.",
  "Mengembangkan kualitas sumber daya manusia untuk menghadirkan layanan yang kompeten dan berdaya saing.",
  "Mengimplementasikan tata kelola perusahaan yang transparan dan akuntabel.",
  "Memperluas akses edukasi serta literasi perdagangan berjangka kepada masyarakat.",
  "Mengoptimalkan teknologi untuk mendukung operasional dan pengalaman nasabah secara efisien.",
];

export type Office = {
  id: string;
  name: string;
  type: "Kantor Pusat" | "Kantor Cabang";
  building: string;
  street: string;
  phone: string;
  fax: string;
  email?: string;
  mapUrl: string;
};

export const offices: Office[] = [
  {
    id: "jakarta-pusat",
    name: "Jakarta Pusat",
    type: "Kantor Pusat",
    building: "Sahid Sudirman Center Lt. 9 Unit C,D,G,H & Lt. 21 Unit A",
    street: "Jl. Jend. Sudirman No.86, Jakarta Pusat 10220",
    phone: "+62 21 27889280 (Hunting)",
    fax: "+62 21 27889277",
    email: "corporate@equityworld-futures.co.id",
    mapUrl: "https://maps.google.com/?q=Sahid+Sudirman+Center+Jakarta",
  },
  {
    id: "surabaya-trillium",
    name: "Surabaya Trillium",
    type: "Kantor Cabang",
    building: "Trillium Office & Residence, Lt.2 & 3",
    street: "Jl. Pemuda No. 108-116, Surabaya 60271",
    phone: "+62 31 6000 3788 (Hunting)",
    fax: "+62 31 6000 3688",
    mapUrl:
      "https://maps.google.com/?q=Trillium+Office+Residence+Surabaya",
  },
  {
    id: "jakarta-selatan",
    name: "Jakarta Selatan",
    type: "Kantor Cabang",
    building: "Gedung Cyber 2 Lt. 19",
    street: "Jl. HR. Rasuna Said Blok X-5 No. 13, Jakarta Selatan 12950",
    phone: "+62 21 2902 1661 (Hunting)",
    fax: "+62 21 2902 1675",
    mapUrl: "https://maps.google.com/?q=Gedung+Cyber+2+Jakarta",
  },
  {
    id: "semarang",
    name: "Semarang",
    type: "Kantor Cabang",
    building: "Rukan Pemuda Mas, Blok A Kav. 12 - 13",
    street: "Jl. Pemuda No. 150, Semarang 50132",
    phone: "+62 24 3520226 (Hunting)",
    fax: "+62 24 3520227",
    mapUrl: "https://maps.google.com/?q=Rukan+Pemuda+Mas+Semarang",
  },
  {
    id: "surabaya-praxis",
    name: "Surabaya Praxis",
    type: "Kantor Cabang",
    building: "Gedung Praxis Lt.5 Unit No.5p. 33,35,36",
    street:
      "Jl. Sono Kembang 4-6, Embong Kaliasin, Kec. Genteng, Surabaya 60271",
    phone: "+62 31 99255088",
    fax: "+62 31 99255066",
    mapUrl: "https://maps.google.com/?q=Gedung+Praxis+Surabaya",
  },
  {
    id: "cirebon",
    name: "Cirebon",
    type: "Kantor Cabang",
    building: "Perkantoran CSB Mall, Yellow Ribbon 15-18",
    street:
      "Jl. DR.Cipto Mangunkusumo Pekiringan, Kesambi, Cirebon 45131",
    phone: "+62 231 8291700",
    fax: "+62 231 8291498",
    mapUrl: "https://maps.google.com/?q=CSB+Mall+Cirebon",
  },
];