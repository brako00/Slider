# Slider

Slider koji pomiće slike u lijevo ili desno ovisno na koju
strelicu korisnik klikne. Slike se pomiću za širinu desne (zadnje) slike u
nizu.
Pomicanje slika je kroz animaciju.
Poseban je zato što izlazi iz Wrappera i proteže se do kraja lijevog ruba ekrana, a
skroz desna slika je zapravo slika u fokusu.
Slider je beskonačan, u smislu da će na prvo mjesto uvijek dolaziti slike koje
su izašle iz viewporta. To se odnosi na svaki red posebno. Klik na jednu strelicu
povlači oba reda istovremeno.
