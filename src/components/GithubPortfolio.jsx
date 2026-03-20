// import React, { useState, useEffect } from 'react';
// import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
// import { themePalette } from '../theme/palette'; // Adjust path if needed

// export default function GithubPortfolio({ githubUrl }) {
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const colors = themePalette;

//   useEffect(() => {
//     const fetchGithubData = async () => {
//       if (!githubUrl) {
//         setLoading(false);
//         return;
//       }

//       // 1. Extract username from URL (e.g., https://github.com/username)
//       // Handles trailing slashes just in case
//       const cleanUrl = githubUrl.trim().replace(/\/$/, ""); 
//       const username = cleanUrl.split('/').pop();

//       if (!username) {
//         setError("Invalid GitHub URL");
//         setLoading(false);
//         return;
//       }

//       try {
//         // 2. Fetch the user's public repos, sorted by most recently updated
//         const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        
//         if (!response.ok) {
//           if (response.status === 403) throw new Error("GitHub API rate limit exceeded.");
//           throw new Error("Could not fetch GitHub data.");
//         }

//         const data = await response.json();

//         // 3. Filter out forks (we only want their original work) and take the top 3
//         const originalRepos = data
//           .filter(repo => !repo.fork)
//           .slice(0, 3);

//         setRepos(originalRepos);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGithubData();
//   }, [githubUrl]);

//   if (!githubUrl) return null; // Don't render anything if no URL is provided
//   if (loading) return <div style={{ color: colors.textSecondary, padding: '20px' }}>Loading GitHub portfolio...</div>;
//   if (error) return <div style={{ color: colors.red, padding: '20px', fontSize: '14px' }}>{error}</div>;
//   if (repos.length === 0) return <div style={{ color: colors.textSecondary, padding: '20px' }}>No public repositories found.</div>;

//   return (
//     <div style={{ padding: '0 30px 30px' }}>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
//         {repos.map(repo => (
//           <a 
//             key={repo.id} 
//             href={repo.html_url} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               padding: '20px',
//               borderRadius: '20px',
//               backgroundColor: colors.mutedSurface,
//               border: `1px solid ${colors.border}`,
//               textDecoration: 'none',
//               transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//               cursor: 'pointer'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-4px)';
//               e.currentTarget.style.boxShadow = colors.shadow;
//               e.currentTarget.style.borderColor = colors.blue;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'none';
//               e.currentTarget.style.boxShadow = 'none';
//               e.currentTarget.style.borderColor = colors.border;
//             }}
//           >
//             <div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
//                 <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <ExternalLink size={16} color={colors.blue} />
//                   {repo.name}
//                 </h3>
//               </div>
//               <p style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5', margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//                 {repo.description || 'No description provided.'}
//               </p>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: colors.textSecondary, fontWeight: '600' }}>
//               {repo.language && (
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//                   <Code size={14} /> {repo.language}
//                 </span>
//               )}
//               <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//                 <Star size={14} /> {repo.stargazers_count}
//               </span>
//               <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//                 <GitFork size={14} /> {repo.forks_count}
//               </span>
//             </div>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { themePalette } from '../theme/palette';

export default function GithubPortfolio({ githubUrl }) {
  const [repos, setRepos] = useState([]);
  const [langData, setLangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const colors = themePalette;

  // A vibrant color palette for the pie chart slices
  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff6b6b'];

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!githubUrl) {
        setLoading(false);
        return;
      }

      const cleanUrl = githubUrl.trim().replace(/\/$/, ""); 
      const username = cleanUrl.split('/').pop();

      if (!username) {
        setError("Invalid GitHub URL");
        setLoading(false);
        return;
      }

      try {
        // Fetch up to 30 recent repos to get a good sample for the language pie chart
        // const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
        const response = await fetch(`http://localhost:8080/public/github/${username}/repos`);
        
        if (!response.ok) {
          if (response.status === 403) throw new Error("GitHub API rate limit exceeded.");
          throw new Error("Could not fetch GitHub data.");
        }

        const data = await response.json();

        // 1. PROCESS REPOSITORIES (Top 3 Original)
        const originalRepos = data.filter(repo => !repo.fork).slice(0, 3);
        setRepos(originalRepos);

        // 2. PROCESS LANGUAGES FOR PIE CHART
        const langCounts = {};
        data.forEach(repo => {
          if (repo.language && !repo.fork) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });

        // Convert the tally object into an array formatted for Recharts
        const formattedLangData = Object.keys(langCounts)
          .map(key => ({ name: key, value: langCounts[key] }))
          .sort((a, b) => b.value - a.value) // Sort highest to lowest
          .slice(0, 5); // Keep only the top 5 languages to keep the chart clean

        setLangData(formattedLangData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [githubUrl]);

  if (!githubUrl) return null; 
  if (loading) return <div style={{ color: colors.textSecondary, padding: '20px' }}>Loading GitHub portfolio...</div>;
  if (error) return <div style={{ color: colors.red, padding: '20px', fontSize: '14px' }}>{error}</div>;
  if (repos.length === 0) return <div style={{ color: colors.textSecondary, padding: '20px' }}>No public repositories found.</div>;

  return (
    <div style={{ padding: '0 30px 30px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
      
      {/* LEFT COLUMN: Language Pie Chart */}
      {langData.length > 0 && (
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: colors.glassSoft, padding: '20px', borderRadius: '20px', border: `1px solid ${colors.border}` }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: colors.textMain }}>Top Languages</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={langData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {langData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: colors.glassStrong, borderRadius: '12px', border: `1px solid ${colors.border}`, color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '10px' }}>
            {langData.map((entry, index) => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: colors.textSecondary, fontWeight: '600' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RIGHT COLUMN: Top Repositories */}
      <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: colors.textMain }}>Recent Activity</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {repos.map(repo => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                padding: '20px', borderRadius: '20px', backgroundColor: colors.mutedSurface, border: `1px solid ${colors.border}`,
                textDecoration: 'none', transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = colors.shadow;
                e.currentTarget.style.borderColor = colors.blue;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ExternalLink size={16} color={colors.blue} />
                    {repo.name}
                  </h3>
                </div>
                <p style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5', margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {repo.description || 'No description provided.'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: colors.textSecondary, fontWeight: '600' }}>
                {repo.language && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Code size={14} /> {repo.language}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} /> {repo.stargazers_count}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GitFork size={14} /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}