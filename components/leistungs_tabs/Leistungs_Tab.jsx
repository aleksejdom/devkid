import React, { forwardRef } from 'react';
import styles from './Leistungs_Tab.module.css';
import { RichText } from 'prismic-reactjs'
import { useState } from 'react';

const Leistungs_Tab = forwardRef(({tabs}, ref) => {
  const [selectedTab, setSelectedTab] = useState('Entwicklung');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  }

  const filteredTabs = tabs.filter(item => item.selection === selectedTab);

  return ( 
    <div className={styles['leistungs-tab']} ref={ref}>
      <div className={styles.header}>
        <h2 className={styles.icon}>Leistungen im Überblick</h2>
        <div className={styles['tab-tabs']}>
          <ul>
            <li key={`Kreation`} onClick={() => handleTabClick('Kreation')} className={selectedTab === 'Kreation' ? styles.activeTab : ''}>Kreation</li>
            <li key={`Entwicklung`} onClick={() => handleTabClick('Entwicklung')} className={selectedTab === 'Entwicklung' ? styles.activeTab : ''}>Entwicklung</li>
          </ul>
        </div>
      </div>
      <div className={styles.tabsWarpper}>
        {filteredTabs.map((item, index) => (
          <div className={styles.tabsContent} key={`tab-0${index+1}`}>
            <h3>{item.content[0].text}</h3>
            <p>{item.content[1].text}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

Leistungs_Tab.displayName = "Leistungs_Tab"; // Setzt den displayName auf "Leistungs_Tab"

export default Leistungs_Tab;