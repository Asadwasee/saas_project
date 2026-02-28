const Contact = require('../models/Contact');

// @desc    Submit a contact form (Public)
// @route   POST /api/contact
exports.submitForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        const newContact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({ 
            success: true, 
            message: "Message sent successfully!", 
            data: newContact 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all messages (Admin Only)
// @route   GET /api/contact
exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Mark message as read
// @route   PUT /api/contact/:id
exports.markAsRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            { isRead: true }, 
            { new: true }
        );
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};