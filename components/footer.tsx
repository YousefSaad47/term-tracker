import { LinkPreview } from './ui/link-preview';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white py-12 text-center">
      <div className="container mx-auto px-6 space-y-6">
        <p className="text-lg font-semibold">
          © {currentYear} المعهد التكنولوجي العالي - كل الحقوق محفوظة
        </p>

        <p className="text-sm">
          تم تطوير الموقع لدعم الطلاب بمعلومات هامة حول الامتحانات والتنبيهات
          الأكاديمية.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
          <LinkPreview
            url="https://www.hti.edu.eg/?page_id=3897"
            className="underline underline-offset-2"
          >
            صفحة المعهد الرئيسية
          </LinkPreview>
          <LinkPreview
            url="http://mis.hti.edu.eg/hti/login.jsp"
            className="underline underline-offset-2"
          >
            موقع التسجيل
          </LinkPreview>
          <LinkPreview
            url="https://drive.google.com/file/d/1776CBrZ31gZUXEzkf-ZxB6Pf50uqIrbk/view"
            className="underline underline-offset-2"
          >
            جدول الترم التاني
          </LinkPreview>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
