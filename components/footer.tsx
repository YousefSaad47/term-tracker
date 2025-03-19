import { LinkPreview } from '@/components/ui/link-preview';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white py-10">
      <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-6">
        <p className="text-lg font-semibold">
          © {currentYear} المعهد التكنولوجي العالي - كل الحقوق محفوظة
        </p>

        <p className="text-sm max-w-md text-neutral-600 dark:text-neutral-400">
          تم تطوير الموقع لدعم الطلاب بمعلومات هامة حول الامتحانات والتنبيهات
          الأكاديمية.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6">
          <LinkPreview
            url="https://www.hti.edu.eg/?page_id=3897"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            صفحة المعهد الرئيسية
          </LinkPreview>
          <LinkPreview
            url="http://mis.hti.edu.eg/hti/login.jsp"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            موقع التسجيل
          </LinkPreview>
          <LinkPreview
            url="https://drive.google.com/file/d/1776CBrZ31gZUXEzkf-ZxB6Pf50uqIrbk/view"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
          >
            جدول الترم التاني
          </LinkPreview>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
