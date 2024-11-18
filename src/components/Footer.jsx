import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <footer className="bg-gray-100 border-t border-gray-200 shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Навигация</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-brand transition-colors duration-200">Главная</Link></li>
                <li><Link to="/aboutus" className="text-gray-600 hover:text-brand transition-colors duration-200">О нас</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-brand transition-colors duration-200">FAQ</Link></li>
                <li><Link to="https://biveki.ru" className="text-gray-600 hover:text-brand transition-colors duration-200">Разработка сайтов</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Контакты</h3>
              <p className="text-gray-600">Иваново, ул. Лежневская, 167 при. 1005</p>
              <p className="text-gray-600">Магазин "Экопродукты"</p>
              <p className="text-gray-600">
                <a href="tel:89158181861" className="hover:text-brand transition-colors duration-200">
                  Телефон: 89158181861
                </a>
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Информация</h3>
              <p className="text-gray-600">ИП Джавадов Вугар Тайяр оглы</p>
              <p className="text-gray-600">ИНН: 671404891676</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Экопродукты. Все права защищены.
          </div>
        </div>
      </footer>
  )
}

export default Footer