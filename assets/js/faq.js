// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items (optional - remove if you want multiple open)
            // faqQuestions.forEach(q => {
            //     q.setAttribute('aria-expanded', 'false');
            //     q.parentElement.classList.remove('active');
            // });
            
            // Toggle current item
            if (isOpen) {
                this.setAttribute('aria-expanded', 'false');
                faqItem.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                faqItem.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.faq-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional: Open first FAQ of each category by default
    // const firstFaqs = document.querySelectorAll('.faq-category .faq-item:first-child .faq-question');
    // firstFaqs.forEach(faq => {
    //     faq.click();
    // });
});
