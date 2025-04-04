import { Hexagon } from 'lucide-react';
import { Footer } from '@/components/ui/footer';
import { LinkedinIcon } from './ui/linkedin-icon';
import { GithubIcon } from './ui/github-icon';

const FooterComp = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer
      logo={<Hexagon className="h-10 w-10" />}
      brandName="Term Tracker"
      mainLinks={[
        {
          href: 'https://www.hti.edu.eg/?page_id=3897',
          label: 'HTI Main Page',
        },
        {
          href: 'http://mis.hti.edu.eg/hti/login.jsp',
          label: 'Registration Portal',
        },
        {
          href: 'https://drive.google.com/file/d/1776CBrZ31gZUXEzkf-ZxB6Pf50uqIrbk/view',
          label: 'Second Term Schedule',
        },
      ]}
      socialLinks={[
        {
          icon: <LinkedinIcon />,
          href: 'https://www.linkedin.com/in/yousefsaad47/',
          label: 'LinkedIn',
        },
        {
          icon: <GithubIcon />,
          href: 'https://github.com/YousefSaad47',
          label: 'GitHub',
        },
      ]}
      copyright={{
        text: `© ${currentYear} Term Tracker. All rights reserved`,
        license:
          'Website developed to support students with academic info and exam alerts.',
      }}
      legalLinks={[]}
    />
  );
};

export default FooterComp;
