const { Notification } = require("../models");

const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    res.json({ notifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({ message: "Server error fetching notifications." });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);

    if (!notification || notification.userId !== req.user.id) {
      return res.status(404).json({ message: "Notification not found." });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: "Notification marked as read.", notification });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({ message: "Server error updating notification." });
  }
};

module.exports = { getMyNotifications, markNotificationRead };
