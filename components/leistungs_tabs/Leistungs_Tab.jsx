import React, { forwardRef } from 'react';
import styles from './Leistungs_Tab.module.scss';
import { RichText } from 'prismic-reactjs';
import { useState } from 'react';
import Image from 'next/image';


const Leistungs_Tab = forwardRef(({tabs}, ref) => {
  const [selectedTab, setSelectedTab] = useState('Entwicklung');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  }
  const filteredTabs = tabs.filter(item => item.selection === selectedTab);
  
  return (
    <div className={styles['leistungs-tab']} ref={ref} >
      <div className={styles.header}>
        <h2 className={styles.icon}>Leistungen</h2>
        <div className={styles['tab-tabs']}>
          <ul>
            <li key={`Kreation`} onClick={() => handleTabClick('Kreation')} className={selectedTab === 'Kreation' ? styles.activeTab : ''}>Kreation</li>
            <li key={`Entwicklung`} onClick={() => handleTabClick('Entwicklung')} className={selectedTab === 'Entwicklung' ? styles.activeTab : ''}>Entwicklung</li>
          </ul>
        </div>
      </div>
      <div className={styles.tabsWarpper}>
        {filteredTabs.map((item, index) => {
          const imageContent = item.content.find(content => content.type === 'image');
          return (
            <div className={styles.tabsContent} key={`tab-0${index + 1}`}>
              {imageContent && 
                <Image 
                src={imageContent.url} 
                alt={imageContent.alt} 
                width={60}  // specify a width
                height={60} // specify a height
                layout="responsive"  // Makes image responsive
                />
              }
              <RichText render={item.content.filter(content => content.type !== 'image')} />
            </div>
          );
        })}
      </div>
    </div>
  )
})

Leistungs_Tab.displayName = "Leistungs_Tab";

export default Leistungs_Tab; 