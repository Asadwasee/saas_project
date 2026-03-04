import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

export default function ServicesPage() {
  const { data: services, loading, error } = useApi('/services')

  return (
    <div className="services-page container" style={{ padding: '40px 20px' }}>
      <section className="page-intro" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Our Expertise</h1>
        <p className="hero-copy">Real-time solutions powered by Codecelix Backend.</p>
      </section>

      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {!loading && services?.map((svc) => (
          <div key={svc._id} className="svc-card" style={{ padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div className="svc-icon" style={{ marginBottom: '20px', color: svc.color || '#007bff' }}>
                <Icon name={svc.icon || 'cog'} size={45} />
            </div>
            <h3>{svc.title}</h3>
            <p style={{ color: '#777', margin: '15px 0' }}>{svc.description}</p>
            <Link to={`/services/${svc.slug}`} className="btn-outline" style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid #007bff', borderRadius: '5px', textDecoration: 'none' }}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}