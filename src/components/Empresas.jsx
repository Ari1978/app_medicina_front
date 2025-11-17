
export default function Empresas() {
  return (
    <section className="bg-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Empresas que confían en nosotros
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-10 opacity-80">
        {[
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/IBM_logo.svg/2560px-IBM_logo.svg.png",
          "https://1000logos.net/wp-content/uploads/2021/04/Accenture-logo.png",
          "https://upload.wikimedia.org/wikipedia/commons/4/44/MercadoLibre_logo.svg",
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        ].map((logo, idx) => (
          <img
            key={idx}
            src={logo}
            className="h-10 md:h-12 object-contain"
            alt="logo"
          />
        ))}
      </div>
    </section>
  );
}
