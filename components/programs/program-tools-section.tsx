'use client';

import React from 'react';
import styles from './program-tools-section.module.css';

interface Tool {
    name: string;
    logo: string;
}

const TOOLS: Tool[] = [
    { name: 'pandas', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg' },
    { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
    { name: 'NumPy', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg' },
    { name: 'matplotlib', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Created_with_Matplotlib-logo.svg' },
    { name: 'TensorFlow', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg' },
    { name: 'Tableau', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png' },
    { name: 'python', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { name: 'Excel', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg' },
    { name: 'SQL', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png' },
];

export default function ProgramToolsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.eyebrow}>Course Journey</span>
                    <h2 className={styles.title}>
                        Learn all the <br />
                        Tools that are <br />
                        <span className={styles.highlight}>In-demand</span>
                    </h2>
                </div>

                <div className={styles.gridWrapper}>
                    <div className={styles.grid}>
                        {TOOLS.map((tool, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.logoWrapper}>
                                    <img
                                        src={tool.logo}
                                        alt={`${tool.name} logo`}
                                        className={styles.logo}
                                        onError={(e) => {
                                            // Fallback if image fails
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerText = tool.name[0];
                                            e.currentTarget.parentElement!.style.backgroundColor = '#ccc';
                                            e.currentTarget.parentElement!.style.borderRadius = '50%';
                                        }}
                                    />
                                </div>
                                <span className={styles.toolName}>{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
