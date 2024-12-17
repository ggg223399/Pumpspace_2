import React from 'react';
import { MessageCircle, Users, Bot } from 'lucide-react';
import { useI18n } from '../../i18n/i18n';

const socialLinks = [
  {
    icon: <Bot size={18} />,
    label: 'nav.tracking_bot',
    href: 'https://t.me/your_bot',
  },
  {
    icon: <MessageCircle size={18} />,
    label: 'nav.signal_channel',
    href: 'https://t.me/your_channel',
  },
  {
    icon: <Users size={18} />,
    label: 'nav.tg_group',
    href: 'https://t.me/your_group',
  },
];

export function SocialLinks() {
  const { t } = useI18n();

  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg
                   bg-surface/50 hover:bg-surface/80 
                   border border-gray-700/50 hover:border-cyan-500/30
                   transition-all duration-200 group"
        >
          <span className="text-gray-400 group-hover:text-cyan-400 transition-colors">
            {link.icon}
          </span>
          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
            {t(link.label)}
          </span>
        </a>
      ))}
    </div>
  );
}